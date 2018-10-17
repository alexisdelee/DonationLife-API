const Exception = require("../../exceptions");
const Authentication = require("../../services/Authentication");
const Role = require("../../services/Role");


module.exports = (lowestRoleRequested, strict = false) => {
    return async (request, response, next) => {
        try {
            const { role, userId } = Authentication.identifyProvider(request.headers["x-access-token"] || "");
            request.credentials = {
                token: {
                    userId,
                    role
                },
                roleInstance: Role.findInstanceByName(role)
            };

            if (request.credentials.roleInstance === null) {
                throw new Exception.NotFound("unknown role");
            }

            if (Role.underControl(lowestRoleRequested, request.credentials.roleInstance, strict) === false) {
                throw new Exception.Forbidden("permission denied - permissions too low");
            }

            // overload .json() method to inject refresh token
            const send = response.json;
            response.json = function (response) {
                if (response.data) {
                    response.data.token = Authentication.refreshToken(request.headers["x-access-token"] || "");
                }

                send.call(this, response);
            };
        } catch (err) {
            if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
                return response.status(Exception.Unauthorized.code).json({ errors: ["token: " + err.message] });
            } else {
                return response.status(Exception.Unauthorized.code).json({ errors: [err.message] });
            }
        }

        next();
    };
};

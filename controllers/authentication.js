const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const Exception = require("../exceptions");
const middleware = require("./middlewares");
const Authentication = require("../services/Authentication");
const Role = require("../services/Role");
const User = require("../services/User");


const endpoint = express.Router();
endpoint.use(bodyParser.json());
endpoint.use(bodyParser.urlencoded({ extended: false }));
endpoint.use(cors());


/**
 * Manage user's connexion
 * external: GraphQL
 * access: all
 * POST /authentication/sign
 */
endpoint.post("/sign", [middleware.graphql("user.sign")], async (request, response) => {
    try {
        const user = await User.sign(request.body.user.email, request.body.user.password);

        response.status(200).json({
            data: {
                user,
                token: Authentication.getToken({
                    role: user.isAdmin ? Role.Admin.name : Role.User.name,
                    userId: user._id
                })
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.message] });
    }
});

/**
 * Add a new user
 * external: GraphQL
 * access: all
 * POST /authentication/register
 */
endpoint.post("/register", [middleware.graphql("user.register")], async (request, response) => {
    try {
        const user = new User(
            null,
            Role.User.name,
            request.body.user.firstname,
            request.body.user.lastname,
            request.body.user.email,
            request.body.user.password,
            request.body.user.age,
            request.body.user.gender,
            request.body.user.phone,
            request.body.user.address,
            request.body.user.bloodType,
            request.body.user.sexualOrientation
        );

        response.status(200).json({
            data: {
                user: await user.save(),
                token: Authentication.getToken({
                    role: user.isAdmin ? Role.Admin.name : Role.User.name,
                    userId: user._id
                })
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.errmsg ? e.errmsg : e.message] });
    }
});


module.exports = endpoint;

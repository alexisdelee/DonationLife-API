const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const Exception = require("../exceptions");
const middleware = require("./middlewares");
const Role = require("../services/Role");
const User = require("../services/User");


const endpoint = express.Router();

endpoint.use(bodyParser.json());
endpoint.use(bodyParser.urlencoded({ extended: false }));
endpoint.use(cors());


/**
 * Get all users
 * external: JSON Web Token
 * access: admin
 * GET /users
 */
endpoint.get("/", [middleware.authentication(Role.Admin)], async (request, response) => {
    try {
        response.status(200).json({
            data: {
                users: await User.findAll()
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.message] });
    }
});

/**
 * Get current user
 * external: JSON Web Token
 * access: user & admin
 * GET /users/current
 */
endpoint.get("/current", [middleware.authentication(Role.User)], async (request, response) => {
    try {
        const user = new User(request.credentials.token.userId);

        response.status(200).json({
            data: {
                user: await user.find({ _id: user.id })
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.message] });
    }
});

/**
 * Update current user with medical data
 * external: JSON Web Token
 * access: user & admin
 * PUT /users/current/upmedicaldata
 */
endpoint.put("/current/upmedicaldata", [middleware.authentication(Role.User), middleware.graphql("user.update")], async (request, response) => {
    try {
        const user = new User(
            null,
            Role.User.name,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            request.body.user.allergens,
            request.body.user.vaccines,
            request.body.user.medicalForm
        );

        await user.saveMedicalData();

        response.status(200).json({
            data: {}
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.message] });
    }
});


module.exports = endpoint;

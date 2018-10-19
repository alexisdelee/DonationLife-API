const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const Exception = require("../exceptions");
const middleware = require("./middlewares");
const Role = require("../services/Role");
const Collect = require("../services/Collect");


const endpoint = express.Router();
endpoint.use(bodyParser.json());
endpoint.use(bodyParser.urlencoded({ extended: false }));
endpoint.use(cors());


/**
 * Get all blood collects near current user
 * external: JSON Web Token | GraphQL
 * access: user & admin
 * POST /collects/current/near
 */
endpoint.post("/current/near", [middleware.authentication(Role.User), middleware.graphql("collect.getnear")], async (request, response) => {
    try {
        response.status(200).json({
            data: {
                collects: await Collect.findAllNear(request.body.collect.latitude, request.body.collect.longitude)
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.errmsg ? e.errmsg : e.message] });
    }
});


module.exports = endpoint;

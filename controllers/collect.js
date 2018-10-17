const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const Exception = require("../exceptions");
const middleware = require("./middlewares");
const Role = require("../services/Role");
const User = require("../services/User");
const Collect = require("../services/Collect");


const endpoint = express.Router();
endpoint.use(bodyParser.json());
endpoint.use(bodyParser.urlencoded({ extended: false }));
endpoint.use(cors());


/**
 * Get all blood collects near current user
 * external: JSON Web Token
 * access: user & admin
 * POST /collects/near
 */
endpoint.get("/near", [middleware.authentication(Role.User)], async (request, response) => {
    try {
        response.status(200).json({
            data: {
                user: await Collect.findAllNear(2.3822, 48.8817) // await Collect.findAllNear(request.query.collect.latitude, request.query.collect.longitude)
            }
        });
    } catch (e) {
        response.status(e.code < 600 ? e.code : Exception.InternalError.code).json({ errors: [e.errmsg ? e.errmsg : e.message] });
    }
});


module.exports = endpoint;

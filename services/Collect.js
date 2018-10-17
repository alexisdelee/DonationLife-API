const axios = require("axios");
const Exception = require("../exceptions");


module.exports = class Collect {
    static get Instance() {
        return new Collect();
    }

    find(criteria) {
        // do something
    }

    static findAllNear(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                const collects = await axios.get("http://api.openeventdatabase.org/event/?what=health.blood.collect&when=nextweek&near=" + 
                    [ latitude, longitude, 50000 ].join(","));

                // faire ensuite un reduce
                resolve(collects.data);
            } catch (e) { reject(e); }
        });
    }
};

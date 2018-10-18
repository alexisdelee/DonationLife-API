const axios = require("axios");
const Exception = require("../exceptions");


module.exports = class Collect {
    static get Instance() {
        return new Collect();
    }

    static findAllNear(latitude, longitude) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get("http://api.openeventdatabase.org/event/?what=health.blood.collect&when=nextweek&near=" + 
                    [longitude,latitude, 50000].join(","));

                resolve(
                    response.data.features.map(collect => {
                        return {
                            latitude: collect.properties.lat,
                            longitude: collect.properties.lon,
                            distance: collect.properties.distance,
                            name: collect.properties.name,
                            where: collect.properties["where:name"],
                            start: collect.properties.start,
                            stop: collect.properties.stop
                        };
                    })
                );
            } catch (e) { reject(e); }
        });
    }
};

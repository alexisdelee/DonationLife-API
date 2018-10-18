const mongoose = require("mongoose");
const models = require("../models");
const Authentication = require("../services/Authentication");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/blood");


(async () => {
    try {
        const data = {
            allergens: {
                model: models.Allergen,
                values: [
                    { name: "Arachide" },
                    { name: "Laitage" },
                    { name: "Gluten" },
                    { name: "Poisson" },
                    { name: "Graine de sésame" },
                    { name: "Crustacé" },
                    { name: "Oeufs" }
                ],
            },
            veccines: {
                model: models.Vaccine,
                values: [
                    { name: "Hépathite B" },
                    { name: "Varicelle" },
                    { name: "Choléra" },
                    { name: "Méningite" },
                    { name: "Fièvre jaune" },
                    { name: "Rougeole/Rubéole" },
                ]
            },
            users: {
                model: models.User,
                values: [
                    {
                        firstname: "Jean",
                        lastname: "Dupond",
                        email: "jean.dupond@gmail.com",
                        password: Authentication.hash("azerty"),
                        age: 45,
                        gender: "Homme",
                        phone: "0123456789",
                        address: "10 rue des champs",
                        bloodType: "AB+",
                        sexualOrientation: "hétérosexuel",
                        isAdmin: false
                    },
                    {
                        firstname: "Emma",
                        lastname: "Dubois",
                        email: "emma.dubois@gmail.com",
                        password: Authentication.hash("azerty"),
                        age: 25,
                        gender: "Femme",
                        phone: "0123456798",
                        address: "35 boulevard des prairies",
                        bloodType: "O-",
                        sexualOrientation: "hétérosexuel",
                        isAdmin: false
                    }
                ]
            }
        };

        // <<< clear
        await mongoose.connection.dropDatabase();
        // clear >>>

        for (const key of Object.keys(data)) {
            const schema = data[key];

            for (const value of schema.values) {
                const schemaModel = new schema.model(value);
                const data = await schemaModel.save();
                console.log(data);
            }
        }

        process.exit(0);
    } catch (e) {
        console.error(e);
    }
})();

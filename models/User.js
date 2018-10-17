const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
    /*firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },*/
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }/*,
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: [ "Homme", "Femme" ],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        enum: [ "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ],
        required: true
    }*/,
    isAdmin: {
        type: Boolean,
        required: true
    }/*,
    allergens: [{
        type: mongoose.Schema.ObjectId,
        ref: "Allergen",
        required: true
    }],
    vaccines: [{
        type: mongoose.Schema.ObjectId,
        ref: "Vaccine",
        required: true
    }],
    medicalForm: {
        type: mongoose.Schema.ObjectId,
        ref: "MedicalForm",
        required: true
    },
    sexualOrientation: {
        type: String,
        enum: [ "hétérosexuel", "bisexuel", "homosexuel" ],
        required: true
    }*/
});
  

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");


const MedicalFormSchema = mongoose.Schema({
    dateTattooCreation: {
        type: String,
        required: true
    },
    datePiercingCreation: {
        type: String,
        required: true
    },
    medicalVisit: {
        type: String,
        enum: [ "- de trois moins", "+ de trois moins" ],
        required: true
    },
    isPregnant: {
        type: Boolean,
        required: true
    },
    isSmoker: {
        type: Boolean,
        required: true
    },
    voyage: {
        type: String,
        enum: [ "- de quatre mois", "+ de quatre mois" ],
        required: true
    },
    voyagePlace: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model("MedicalForm", MedicalFormSchema);

const mongoose = require("mongoose");


const VaccineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});
  

module.exports = mongoose.model("Vaccine", VaccineSchema);

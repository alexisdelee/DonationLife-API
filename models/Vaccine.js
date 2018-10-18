const mongoose = require("mongoose");


const VaccineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
  

module.exports = mongoose.model("Vaccine", VaccineSchema);

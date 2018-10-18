const mongoose = require("mongoose");


const OrderVaccineSchema = mongoose.Schema({
    vaccine: {
        type: mongoose.Schema.ObjectId,
        ref: "Vaccine",
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});
  

module.exports = mongoose.model("OrderVaccine", OrderVaccineSchema);

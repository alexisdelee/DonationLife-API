const mongoose = require("mongoose");


const OrderAllergenSchema = mongoose.Schema({
    allergen: {
        type: mongoose.Schema.ObjectId,
        ref: "Allergen",
        required: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});
  

module.exports = mongoose.model("OrderAllergen", OrderAllergenSchema);

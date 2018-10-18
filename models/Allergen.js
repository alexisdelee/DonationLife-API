const mongoose = require("mongoose");


const AllergenSchema = mongoose.Schema({
    ingredient: {
        type: String,
        required: true,
        unique: true
    },
    selected: {
        type: Boolean,
        required: true
    }
});
  

module.exports = mongoose.model("Allergen", AllergenSchema);

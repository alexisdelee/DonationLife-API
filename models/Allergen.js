const mongoose = require("mongoose");


const AllergenSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});
  

module.exports = mongoose.model("Allergen", AllergenSchema);

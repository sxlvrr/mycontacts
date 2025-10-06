const mongoose = require("mongoose");

const capitalizeWords = (str) => {
    if (!str) return str;
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Prénom obligatoire"],
            set: capitalizeWords,
        },
        lastName: {
            type: String,
            required: [true, "Nom obligatoire"],
            set: capitalizeWords,
        },
        phone: {
            type: String,
            required: [true, "Numéro de téléphone obligatoire"],
            minlength: [10, "Le numéro de téléphone doit contenir au moins 10 caractères"],
            maxlength: [20, "Le numéro de téléphone ne peut pas dépasser 20 caractères"],
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false  // Supprime le champ __v
    }
);

module.exports = mongoose.model("Contact", contactSchema);

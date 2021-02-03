const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Supp = new Schema(
    {
        nomSupp: {
            type: String,
            required: true,
            trim: true,
            minlenght: 3,
        },
        imagePath: {
            type: String,
            required: true,
            trim: true,
            minlenght: 3,
        }
    },
    {
        versionKey: false
    }
);

const SuppEx = mongoose.model("Supp", Supp);
module.exports = SuppEx;

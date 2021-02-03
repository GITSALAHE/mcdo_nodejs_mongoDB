const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SousMenu = new Schema(
    {
        nomSousMenu: {
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
        },
        
        idMenu: {
            type: String,
            required: true,
            trim: true,
        },
        prix:{
            type:String,
            required: true,
            trim:true,
            minlength:1,
          },
          pointFid:{
            type:String,
            required: true,
            trim:true,
            minlength:3,
          }
    },
    {
        versionKey: false
    }
);

const SousMenuEx = mongoose.model("SousMenu", SousMenu);
module.exports = SousMenuEx;

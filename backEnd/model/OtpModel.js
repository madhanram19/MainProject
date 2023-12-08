const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },

        otp: {
            type: String,
            required: true,
        },
    },
    {
        collection: "otp",
    }
);

const Otp = mongoose.model("Captcha", otpSchema);

module.exports = Otp;
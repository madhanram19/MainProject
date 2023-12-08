const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        street: {
            type: String,
        },
        area: {
            type: String,
        },
        state: {
            type: String,
        },
    },
    {
        collection: "address",
    }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
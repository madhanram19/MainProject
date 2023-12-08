const mongoose = require('mongoose');


const contactusSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Number: {
        type: String,
        required: true,
    },
    selectOption: {
        type: String,
        required: true,
    },
    textArea: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registers',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});


const contactus = mongoose.model('contactus', contactusSchema);

module.exports = contactus;
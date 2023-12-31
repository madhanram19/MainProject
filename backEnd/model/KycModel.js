const mongoose = require('mongoose')

const kycSchema = new mongoose.Schema({
    aadharName: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    selectCountry: {
        type: String,
        required: true
    },
    aadharFront: {
        type: String,
        required: true
    },
    aadharBack: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
    ,
    kycVerifiy: {
        type: Boolean,
        default: false
    },
    waitingStatus: {
        type: Boolean,
        default: true
    }
})


const kycModal = mongoose.model('UserKyc', kycSchema)

module.exports = kycModal 
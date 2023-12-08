const mongoose = require('mongoose')

const bankAccount = new mongoose.Schema({
    accountName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    IFSCCode: {
        type: String,
        required: true
    },
    selectBank: {
        type: String,
        required: true
    },
    selectCountry: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bankAccountVerified: {
        type: Boolean,
        default: false
    },
    waitingStatus: {
        type: Boolean,
        default: true
    }
})


const bankModal = mongoose.model('UserBankAccountDetails', bankAccount)

module.exports = bankModal
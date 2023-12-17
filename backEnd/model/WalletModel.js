const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    collection: 'wallet',
  }
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;

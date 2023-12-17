const mongoose = require('mongoose');

const market = new mongoose.Schema({
  inr: {
    type: Number,
    default: 0,
  },
  usdt: {
    type: Number,
    default: 0,
  },
  btc: {
    type: Number,
    default: 0,
  },
  user: {
    type: String,
    required: true,
  },
});

const marketModel = mongoose.model('Market', market);

module.exports = marketModel;

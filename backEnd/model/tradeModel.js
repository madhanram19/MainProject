const mongoose = require('mongoose');

const trade = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
  },
  orderType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  user: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const tradeModel = mongoose.model('Market Trade', trade);

module.exports = tradeModel;

const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide cryptocurrency name'],
      trim: true
    },
    symbol: {
      type: String,
      required: [true, 'Please provide cryptocurrency symbol'],
      uppercase: true,
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative']
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL']
    },
    change24h: {
      type: Number,
      default: 0,
      description: '24h price change percentage'
    },
    marketCap: {
      type: Number,
      default: 0
    },
    volume24h: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Crypto', cryptoSchema);

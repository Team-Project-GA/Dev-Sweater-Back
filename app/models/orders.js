const mongoose = require('mongoose')

const productSchema = require('./products')

const orderSchema = new mongoose.Schema({
  order: [productSchema],
  totalPrice: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)

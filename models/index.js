const mongoose = require('mongoose')
const DonutSchema = require('./donut')
const DonutShopSchema = require('./donutShop')

const Donut = mongoose.model('Donut', DonutSchema)
const DonutShop = mongoose.model('DonutShop', DonutShopSchema)

module.exports = {
  Donut,
  DonutShop
}

const { Schema } = require('mongoose')

const Donut = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    donutShop_id: { type: Schema.Types.ObjectId, ref: 'DonutShop' }
  },
  { timestamps: true }
)

module.exports = Donut

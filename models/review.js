const { Schema } = require('mongoose')

const Review = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    stars: { type: Number, required: true },
    review: { type: String, required: true },
    donutShop_id: { type: Schema.Types.ObjectId, ref: 'donutShop_id' }
  },
  { timestamps: true }
)

module.exports = Review

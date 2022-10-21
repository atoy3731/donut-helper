const db = require('../db')
const models = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

shop1 = new models.DonutShop()
shop1.name = "Example Shop"
shop1.location = "123 Example St., Anywhere, VA 12345"
shop1.url = "https://www.example-shop.com"
shop1.image = "images/example-shop.jpg"
shop1.save()

s1_donut1 = new models.Donut({
    name: "Bavarian",
    price: "3.22",
    review: "This donut is delicious.",
    donutShop_id: shop1._id
})
s1_donut1.save()


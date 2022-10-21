var express = require('express');
var router = express.Router();
var models = require('../models');
var db = require('../db');
const mongoose = require('mongoose');

// Get list of all stores
router.get('/stores/', (req, res) => {
    models.DonutShop.find({}, 'name').exec(function(err, shops) {
        res.send({ shops: shops })
    })
})

// Get specific store information
router.get('/stores/:StoreID', (req, res) => {
    models.DonutShop.findById(req.params['StoreID']).exec(function(err, shop) {
        res.send(shop)
    })
})

// Get a store's donut list
router.get('/donuts/:StoreID', (req, res) => {
    models.Donut.find({donutShop_id: req.params['StoreID']}, 'name location url image').exec(function(err, donuts) {
        res.send({ donuts: donuts })
    })
})

// Get specific donut info
router.get('/donuts/:StoreID/:DonutID', (req, res) => {
    models.Donut.find({_id: req.params['DonutID'], donutShop_id: req.params['StoreID']}, 'name price review').exec(function(err, donut) {
        res.send(donut)
    })
})

// Create a donut
router.post('/donuts/:StoreID', (req, res) => {
    // Check if store ID is valid
    models.DonutShop.count({_id: req.params['StoreID']}).exec(function(err, count) {
        if (count == 0) {
            res.send({status: 'error', message: 'Donut shop not found.'})
            return
        }
    })

    // Check if donut already exists
    models.Donut.count({name: req.body.name, donutShop_id: req.params['StoreID']}).exec(function(err, count) {
        if (count > 0) {
            res.send({status: 'error', message: 'Donut already exists.'})
            return
        }
    })

    // Create the donut, and handle errors if it is invalid or missing fields
    try {
        var donut = new models.Donut({
            name: req.body.name,
            price: req.body.price,
            review: req.body.review,
            donutShop_id: req.params['StoreID']
        })

        donut.save(function(err, donut) {
            if (err) {
                console.log(err.message)
                if (err.message.includes('Donut validation failed')) {
                    res.send({status: 'error', message: 'Invalid Donut'})
                } else {
                    res.send({status: 'error', message: 'System error. Contact an administrator.'})
                }
                return
            }
            res.send({status: 'success'})
        })
    } catch (e) {
        console.log(e)
        res.send({status: 'error', message: 'System error. Contact an administrator.'})
    }
})

router.delete('/donuts/:StoreID/:DonutID', (req, res) => {
    // Confirm donut exists
    models.Donut.count({_id: req.params['DonutID'], donutShop_id: req.params['StoreID']}).exec(function(err, count) {
        if (count != 1) {
            res.send({status: 'error', message: 'Donut not found.'})
            return
        }
    })
    // Delete the donut
    models.Donut.deleteOne({_id: req.params['DonutID'], donutShop_id: req.params['StoreID']}).exec(function(err) {
        if (err) {
            console.log(err)
            res.send({status: 'error', message: 'System error. Contact an administrator.'})
            return
        }
        res.send({status: 'success'})
    })
})


module.exports = router;
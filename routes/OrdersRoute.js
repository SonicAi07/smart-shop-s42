const express = require('express')
const Orders = require('../config/schemas/OrdersSchema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const router = express.Router()

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://smart-shop-ilyas.netlify.app");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/get-orders', (req, res) => {

    Orders.aggregate([
        {
            $match: { FkUserId: ObjectId(req.body.Id) }
        },
        {
            $lookup: {
                from: "products",
                localField: "ProductId",
                foreignField: "_id",
                as: "products"
            }
        }
    ])
        .then((result) => {
            res.json({ isSuccess: true, Orders: result })
        })

})

router.post('/post-orders', (req, res) => {

    const { ProductId, UserId, Address } = req.body

    const dt = new Date()

    Orders.insertMany([{
        FkUserId: UserId,
        ProductId: ProductId,
        address: Address,
        orderDate: `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    }]).then((result) => {
        res.json({ isSuccess: true, message: "Successfully Added the Product" })
    })

})


module.exports = router
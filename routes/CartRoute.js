const express = require('express')
const Cart = require('../config/schemas/CartSchema')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const router = express.Router()

router.get('/get-cart', (req, res) => {
    Cart.find({}).then((result) => {
        res.send(result)
    })
})

router.post('/get-cart-items', (req, res) => {

    Cart.aggregate([
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
            res.json({ isSuccess: true, CartItems: result })
        })
})

router.post('/post-cart-item', (req, res) => {

    const { ProductId, FKUserId } = req.body

    Cart.find({ ProductId: ProductId, FkUserId: FKUserId }).count().then((data) => {
        if (data === 0) {
            Cart.insertMany([{
                FkUserId: FKUserId,
                ProductId: ProductId
            }]).then((result) => {
                res.json({ isSuccess: true, message: "Successfully Added the Cart" })
            })
        }
        else {
            res.json({ isSuccess: false, message: "Already added in Cart" })
        }
    })

})

router.post('/remove-cart-item', (req, res) => {

    const { CartId } = req.body

    Cart.deleteOne({ _id: CartId }).then((result) => {
        res.json({ isSuccess: true, message: "Deleted from Cart" })
    })


})


module.exports = router
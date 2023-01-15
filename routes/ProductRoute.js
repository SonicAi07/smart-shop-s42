const express = require('express')
const Products = require('../config/schemas/ProductsSchema')

const router = express.Router()

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

router.get('/get-products', (req, res) => {

    Products.find({}).then((result) => {
        res.json({ isSuccess: true, Products: result })
    })

})

router.post('/post-product', (req, res) => {

    const { ProductName, ProductImage, ProductType, ProductRating, ProductReview, ProductPrice, ProductDescription } = req.body

    Products.insertMany([{
        productName: ProductName,
        productImage: ProductImage,
        productType: ProductType,
        productRating: ProductRating,
        productReview: ProductReview,
        productPrice: ProductPrice,
        productDescription: ProductDescription
    }]).then((result) => {
        res.json({ isSuccess: true, message: "Successfully Added the Product" })
    })

})


module.exports = router
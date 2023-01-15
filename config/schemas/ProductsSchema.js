const mongoose = require('mongoose')

const Schema = mongoose.Schema


const ProductsSchema = Schema({
    productName: {
        type: String,
        requried: true
    },
    productImage: {
        type: String,
        required: true
    },
    productType: {
        type: String,
        required: true
    },
    productRating: {
        type: String,
        required: true
    },
    productReview: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    }
})



const Products = mongoose.model('products', ProductsSchema)

module.exports = Products
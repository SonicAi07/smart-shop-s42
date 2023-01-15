const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CartSchema = Schema({

    FkUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }

})


const Cart = mongoose.model('cart', CartSchema)

module.exports = Cart
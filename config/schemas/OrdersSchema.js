const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = Schema({

    FkUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    ProductId: {
        type: Schema.Types.ObjectId,
        ref: 'Products'
    },
    address: {
        type: String,
        required: true
    },
    orderDate: {
        type: String,
        required: true
    }

})


const Orders = mongoose.model('orders', OrderSchema)

module.exports = Orders
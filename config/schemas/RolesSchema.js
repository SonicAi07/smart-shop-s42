const mongoose = require('mongoose')


const RoleSchema = mongoose.Schema({

    Role: {
        type: String,
        required: true
    }

})



const Roles = mongoose.model('roles', RoleSchema)

module.exports = Roles


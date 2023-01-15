const express = require('express')
const Roles = require('../config/schemas/RolesSchema')

const router = express.Router()



router.get('/get-roles', (req, res) => {

    Roles.find({}).then((result) => {
        res.json({ isSuccess: true, Roles: result })
    })

})

// User Role Id : 63b8405143206659babb5dd5

// Post Roles

// router.get('/post-roles', (req, res) => {

//     Roles.insertMany([
//         {
//             Role: "admin"
//         },
//         {
//             Role: "user"
//         },
//         {
//             Role: "guest"
//         }
//     ]).then((res) => {
//         console.log(res)
//     })

// })



module.exports = router
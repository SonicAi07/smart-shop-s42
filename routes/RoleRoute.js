const express = require('express')
const Roles = require('../config/schemas/RolesSchema')

const router = express.Router()

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://smart-shop-ilyas.netlify.app");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
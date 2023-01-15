const express = require('express')
const Users = require('../config/schemas/UsersSchema')
const bcrypt = require('bcrypt');
const Roles = require('../config/schemas/RolesSchema');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const router = express.Router()
const saltRound = 5;



// Get Users

router.get('/get-users', (req, res) => {

    Users.find({}).then((result) => {

        res.json({ isSuccess: true, UsersData: result })

    })

})

router.get('/get-user-with-roles', (req, res) => {

    Users.aggregate([
        {
            $match: { username: req.body.Username }
        },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "roles"
            }
        }
    ])
        .then((data) => {
            res.json({ isSuccess: true, UserData: data })
        })

})

router.get('/get-roles', (req, res) => {
    Roles.find({}).then((result) => {
        res.json({ isSuccess: true, Roles: result })
    })
})

// Check Email 

router.post('/check-email', (req, res) => {

    Users.find({ email: req.body.Email }).then((result) => {

        if (result.length !== 0) {

            res.json({ isSuccess: true })

        }
        else {
            res.json({ isSuccess: false })
        }

    })

})

// Get By Id

router.post('/get-by-id', (req, res) => {

    Users.aggregate([
        {
            $match: { _id: ObjectId(req.body.Id) }
        },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "roles"
            }
        }
    ])
        .then((result) => {
            res.json({ isSuccess: true, UserData: result, Role: result[0].roles[0]._id })
        })

})

// Update User

router.post('/update-user', (req, res) => {

    Users.updateMany(
        {
            _id: req.body.Id
        },
        {
            $set: { username: req.body.Username, email: req.body.Email, role: req.body.RoleId }
        },
        {
            upsert: true
        }

    ).then((result) => {
        res.json({ isSuccess: true, message: "Successfully Updated..!" })
    })

})

// Delete User

router.post('/delete-user', (req, res) => {

    Users.deleteOne({ _id: req.body.Id }).then((result) => {
        res.json({ isSuccess: true, message: "Successfully Deleted..!" })
    })

})

// Change Password 

router.post('/change-password', (req, res) => {

    bcrypt.hash(req.body.Password, saltRound).then((result) => {

        Users.updateOne({ email: req.body.Email }, { $set: { password: result } }, { upsert: true })
            .then((result) => {
                res.json({ isSuccess: true })
            })

    })

})

// Register

router.post('/register-user', (req, res) => {

    const { Username, Email, Password } = req.body

    bcrypt.hash(Password, saltRound).then((result) => {
        Users.insertMany([{
            username: Username,
            email: Email,
            password: result,
            role: '63b8405143206659babb5dd5'
        }]).then((response) => {
            res.json({ isSuccess: true, message: "Successfully Registered..!" })
        })
    })

})

// Login

router.get('/login', (req, res) => {
    if (req.session.User) {
        res.json(
            {
                isSuccess: true,
                UserData: req.session.User,
                role: req.session.Role,
            }
        )
    }
    else {
        res.json({ isSuccess: false })
    }
})

router.post('/login', (req, res) => {

    const { Username, Password } = req.body

    Users.aggregate([
        {
            $match: { username: Username }
        },
        {
            $lookup: {
                from: "roles",
                localField: "role",
                foreignField: "_id",
                as: "roles"
            }
        }
    ]).then((user) => {
        if (user.length !== 0) {
            bcrypt.compare(Password, user[0].password).then((isTrue) => {
                if (isTrue) {
                    req.session.User = user
                    req.session.Role = user[0].roles[0].Role
                    res.json({ isSuccess: true, UserData: user, message: "Successfully Logged In...!", role: user[0].roles[0].Role })
                }
                else {
                    res.json({ isSuccess: false, message: "Invalid Username or Password" })
                }
            })
        }
        else {
            res.json({ isSuccess: false, message: "Invalid Username or Password" })
        }
    })

})


router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.json({ isSuccess: true, message: "Successfully Logged Out...!" })
    })
})

module.exports = router
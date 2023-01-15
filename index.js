const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 8080
require('./config/db/db')
require('dotenv').config()

const RolesRouter = require('./routes/RoleRoute')
const UsersRouter = require('./routes/UserRoute')
const ProductsRouter = require('./routes/ProductRoute')
const CartRouter = require('./routes/CartRoute')
const OrdersRouter = require('./routes/OrdersRoute')
const MailRouter = require('./routes/MailRouter')

const app = express()
app.use(cors({
    origin: "https://smart-shop-ilyas.netlify.app",
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    key: "_isLoggedIn",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}))

app.use('/Images', express.static('./Images'))

app.use('/ss', RolesRouter)
app.use('/ss', UsersRouter)
app.use('/ss', ProductsRouter)
app.use('/ss', CartRouter)
app.use('/ss', OrdersRouter)
app.use('/mail', MailRouter)

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
})
const express = require('express')
const router = express.Router()
const { SendMailText, SendMailHtml } = require('../config/Mails/SendMail')

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

router.post('/send-mail-text', (req, res) => {

    const { toMail, toSubject, toMessage } = req.body

    let result = SendMailText(toMail, toSubject, toMessage)

    result.then((res2) => {
        res.json({ isSuccess: true })
    })


})

router.post('/send-mail-html', (req, res) => {

    const { toMail, toSubject, toMessage } = req.body

    let result = SendMailHtml(toMail, toSubject, toMessage)

    result.then((response) => {
        res.json({ isSuccess: true })
    })

})

module.exports = router
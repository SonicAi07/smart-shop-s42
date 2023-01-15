const { createTransport } = require('nodemailer')

const SendMailText = async (toMail, toSubject, toMessage) => {

    let transport = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SECRET_MAIL,
            pass: process.env.SECRET_PASS
        }
    })

    const mailOption = {
        from: "smart-shop<noreply@gmail.com>",
        subject: toSubject,
        to: toMail,
        text: toMessage
    }

    return await transport.sendMail(mailOption)

}
const SendMailHtml = async (toMail, toSubject, toMessage) => {

    let transport = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SECRET_MAIL,
            pass: process.env.SECRET_PASS
        }
    })

    const mailOption = {
        from: "smart-shop<noreply@gmail.com>",
        subject: toSubject,
        to: toMail,
        html: toMessage
    }

    return await transport.sendMail(mailOption)

}


module.exports = { SendMailText, SendMailHtml }
import nodemailer from 'nodemailer'


const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: 'Ecommerc',
        to: option.email,
        subject: "confirmation",
        html: `<b>${option.code}</b>`, 
    });

    return info.accepted.length ? true : false
}
export default sendEmail
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_TO,
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send({ success: false, message: 'Erro ao enviar e-mail' });
        } else {
            console.log('Email enviado: ' + info.response);
            res.send({ success: true, message: 'E-mail enviado com sucesso!' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

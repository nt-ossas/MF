const nodemailer = require('nodemailer');

const express = require('express');
const app = express();
app.use(express.json());

app.post('/order', async (req, res) => {
    const { name, surname, email, cart } = req.body;

    // Dati email al negozio
    const subjectStore = `Nuovo ordine da ${name} ${surname}`;
    let messageStore = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .email-header h1 {
                margin: 0;
                font-size: 24px;
            }
            .email-body {
                padding: 20px;
                line-height: 1.6;
            }
            .cart-item {
                border-bottom: 1px solid #ddd;
                padding: 10px 0;
            }
            .cart-item:last-child {
                border-bottom: none;
            }
            .item-name {
                font-weight: bold;
            }
            .item-price {
                color: #007bff;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='email-header'>
                <h1>Nuovo ordine ricevuto!</h1>
            </div>
            <div class='email-body'>
                <p>Ciao, hai ricevuto un nuovo ordine da <strong>${name} ${surname}</strong></p>
                <p><strong>Dettagli dell'ordine:</strong></p>
                <ul>`;

    cart.forEach(item => {
        messageStore += `
                <li class='cart-item'>
                    <span class='item-name'>${item.name}</span> - 
                    <span class='item-price'>€${item.price}</span>
                </li>`;
    });

    messageStore += `
                </ul>
                <p><strong>Spedizione rapida inclusa.</strong></p>
            </div>
            <div class='footer'>
                <p>Grazie per aver scelto il nostro negozio!</p>
            </div>
        </div>
    </body>
    </html>`;

    // Dati email al cliente
    const subjectCustomer = `Conferma del tuo ordine da ${name} ${surname}`;
    let messageCustomer = `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #28a745;
                color: #fff;
                padding: 20px;
                text-align: center;
            }
            .email-header h1 {
                margin: 0;
                font-size: 24px;
            }
            .email-body {
                padding: 20px;
                line-height: 1.6;
            }
            .cart-item {
                border-bottom: 1px solid #ddd;
                padding: 10px 0;
            }
            .cart-item:last-child {
                border-bottom: none;
            }
            .item-name {
                font-weight: bold;
            }
            .item-price {
                color: #007bff;
            }
            .footer {
                background-color: #f4f4f4;
                padding: 10px;
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class='email-container'>
            <div class='email-header'>
                <h1>Conferma del tuo ordine</h1>
            </div>
            <div class='email-body'>
                <p>Ciao <strong>${name} ${surname}</strong>,</p>
                <p>Grazie per il tuo ordine! Ecco i dettagli:</p>
                <ul>`;

    cart.forEach(item => {
        messageCustomer += `
                <li class='cart-item'>
                    <span class='item-name'>${item.name}</span> - 
                    <span class='item-price'>€${item.price}</span>
                </li>`;
    });

    messageCustomer += `
                </ul>
                <p><strong>Spedizione rapida inclusa.</strong></p>
                <p>Riceverai una notifica quando il tuo ordine verrà spedito.</p>
            </div>
            <div class='footer'>
                <p>Grazie per aver scelto il nostro negozio!</p>
            </div>
        </div>
    </body>
    </html>`;

    // Creazione del trasportatore SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'techzone.iys@gmail.com',
            pass: 'kakp altd evfl qskq' // Usa una password applicativa per Gmail
        }
    });

    // Email al negozio
    try {
        await transporter.sendMail({
            from: 'techzone.iys@gmail.com',
            to: 'techzone.iys@gmail.com',
            subject: subjectStore,
            html: messageStore
        });
    } catch (error) {
        return res.status(500).send("Errore nell'invio dell'email al negozio");
    }

    // Email di conferma al cliente
    try {
        await transporter.sendMail({
            from: 'techzone.iys@gmail.com',
            to: email,
            subject: subjectCustomer,
            html: messageCustomer
        });
        return res.status(200).send("Ordine inviato con successo e conferma inviata al cliente!");
    } catch (error) {
        return res.status(500).send("Errore nell'invio dell'email di conferma al cliente");
    }
});

// Porta di ascolto del server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});

'use strict';

const { useEncryption } = require('./src/hooks/useEncryption');
const express = require('express');
const app = express();
const [randomUpperCase, encryptPassword, decryptPassword] = useEncryption();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000, () => console.log('Server has started!'));

app.use(express.static('./src/screens'));
app.use(express.json());

app.post('/', (req, res) => {
    console.log('Getting data...');
    console.log(`Initializing data... #: ${req.body}`);
    const data = req.body;
    const { encryptedPassword, coefficients } = data;
    console.log(` # Encryption: ${encryptedPassword} - ${coefficients}`);
    const decryptedPassword = decryptPassword(encryptedPassword, coefficients);
    console.log('Sending decrypted password to client... !');
    res.json(decryptedPassword);
});
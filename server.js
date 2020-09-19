'use strict';

const { useEncryption } = require('./src/hooks/useEncryption');
const express = require('express');
const app = express();
const { encryptPassword, decryptPassword } = useEncryption();

app.get('/', (req, res) => res.send('Hello World'));

app.listen(3000, () => console.log('Server has started!'));

app.use(express.static('./src/screens'));
app.use(express.json());

function handleEncryption(encryptedPassword, encryptedCoefficient, coefficients) {
    const decryptedCoefficient = decryptPassword(encryptedCoefficient, coefficients);
    const decryptedPassword = decryptPassword(encryptedPassword, decryptedCoefficient);
    return decryptedPassword;
}

app.post('/', (req, res) => {
    const { encryptedPassword, encryptedCoefficient, coefficients } = req.body;
    console.log(` # Encryption: ${encryptedPassword} - ${encryptedCoefficient}`);
    const decryptedPassword = handleEncryption(encryptedPassword, encryptedCoefficient, coefficients);
    // do something with the decryptedPassword
    // then send the encryptedPasswords to client again
    // and thats how you communicate safely between client side and serverside...
    res.json({ encryptedPassword, encryptedCoefficient, coefficients });
});
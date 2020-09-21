'use strict';

const { useEncryption } = require('./src/hooks/useEncryption');
const express = require('express');
const terminalImage = require('terminal-image');
const figlet = require('figlet');
const { readFileSync, writeFileSync } = require('fs');
const app = express();
const { encryptPassword, decryptPassword } = useEncryption();

function handleEncryption(encryptedPassword, encryptedCoefficient, coefficients) {
    const decryptedCoefficient = decryptPassword(encryptedCoefficient, coefficients);
    const decryptedPassword = decryptPassword(encryptedPassword, decryptedCoefficient);
    return decryptedPassword;
}

function serverInit() {
    //console.log(await terminalImage.file('./images/WITHOUT_WARNING.png', { width: '100%' }));
    console.log(figlet.textSync('WITHOUT', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false
    }));
    console.log(figlet.textSync('WARNING', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false
    }));

}

app.listen(3000, serverInit);

app.use(express.static('./src/screens'));
app.use(express.json());

app.post('/', (req, res) => {
    const { encryptedPassword, encryptedCoefficient, coefficients } = req.body;
    const userData = req.body;
    console.log(userData);
    console.log(` # Encryption: ${encryptedPassword} - ${encryptedCoefficient}`);
    const decryptedPassword = handleEncryption(encryptedPassword, encryptedCoefficient, coefficients);
    /* 
        do whatever you want with the decryptedPassword
        then send the encryptedPasswords to client again
        and thats how you communicate safely between client side and serverside... 
    */
    res.json({ encryptedPassword, encryptedCoefficient, coefficients });
});

app.get('/all', (req, res) => {
    const passwordsDB = readFileSync('./passwords.json');
    const passwordsJSON = JSON.parse(passwordsDB);
    console.log(passwordsJSON);
    res.send(passwordsJSON);
});


'use strict';

const { decryptPassword } = require('./src/encryption/coefficientFairEncryption');
const express = require('express');
const figlet = require('figlet');
const app = express();

function serverInit() {
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
    const encryptenData = req.body;
    const decryptedPassword = decryptPassword(encryptenData);
    console.log(' ~ Decrypting password...');
    console.log(` ~ Password is: ${decryptedPassword}`);
    /* 
        do whatever you want with the decryptedPassword
        then send the encryptedPasswords to client again
        and thats how you communicate safely between client side and serverside... 
    */
    res.json(encryptenData);
});


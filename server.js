'use strict';

const { useEncryption } = require('./src/hooks/useEncryption');
const express = require('express');
const terminalImage = require('terminal-image');
const figlet = require('figlet');
const app = express();
const { encryptPassword, decryptPassword } = useEncryption();

const data = {
    "unicorn": 5,
    "doom": 2,
    "gloom": -1
};

app.listen(3000, async () => {
    console.log(await terminalImage.file('./images/WITHOUT_WARNING.png', { width: '100%' }));
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
    console.log(figlet.textSync('uitwaaien . . .', {
        font: 'big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: false
    }));
});

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
    /* 
        do whatever you want with the decryptedPassword
        then send the encryptedPasswords to client again
        and thats how you communicate safely between client side and serverside... 
    */
    res.json({ encryptedPassword, encryptedCoefficient, coefficients });
});

app.get('/all', (req, res) => {
    res.send(data);
});

app.get('/add/:word/:score', addWord);

function addWord(req, res) {
    const params = req.params;
    data[params.word] = parseInt(params.score);
    res.send({
        "message": "Thank you for your contribution"
    });
}
'use strict';

const express = require('express');
const app = express();

app.listen(3000);

app.use(express.static('./src/screens'));
app.use(express.json());

console.log('Server has started');

function decryptPassword(password, coefficients) {
    let decryptedPassword = '';
    let coefficientIndex = 0;
    console.log(' ~ Decrypting password... ');
    for (let i = coefficients[coefficientIndex]; i < password.length; i = i + (coefficients[coefficientIndex] + 1)) {
        decryptedPassword = decryptedPassword + password[i];
        coefficientIndex++;
    }
    console.log(' ~ Decrypting password is done. ');
    return decryptedPassword;
}

app.post('/', async (req, res) => {
    console.log(req.body);
});
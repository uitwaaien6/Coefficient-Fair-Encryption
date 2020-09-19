// COEFFICIENT FAIR ENCRYPTION SYSTEM. WRITTEN BY RUZGAR ATA OZKAN

/*
    

    ======================================================================================

    This encryption system is designed to be used in the client side and its aim is to protect passwords from the internet traffic while being sent to the server. So is anyone to capture the password from the internet traffic is going to get the encrypted password.
*/

function randomUpperCase(letter) {
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum == 1) return letter.toUpperCase()
    else return letter.toLowerCase();
}

function encryptPassword(password) {
    const letters = 'qwertyuiopasdfghjklzxcvbnm1234567890!&?$'.split('');
    console.log(letters);
    const complexity = 4;
    let coefficients = [];
    let coefficient = 0;
    let encryption = '';
    let encryptedPassword = '';
    let encryptedCoefficient = '';
    console.log(' ~ Encrypting password... ');
    for (let i = 0; i < password.length; i++) {
        coefficient = Math.floor(Math.random() * complexity + complexity);
        coefficients.push(coefficient);
        for (let j = 0; j < coefficient; j++) {
            const randomNum = Math.floor(Math.random() * letters.length);
            const generatedCode = randomUpperCase(letters[randomNum]);
            encryption = encryption + generatedCode;
        }
        encryptedPassword = encryptedPassword + encryption + password[i];
        encryption = '';
    }
    console.log(' ~ Password encryption is done. ');

    // ================== second phase ==================================

    const coeffsAsString = convertArrayToString(coefficients);
    console.log(coeffsAsString);
    coefficients = [];
    coefficient = 0;
    console.log(' ~ Encrypting coefficients... ');
    for (let i = 0; i < coeffsAsString.length; i++) {
        coefficient = Math.floor(Math.random() * complexity + complexity);
        coefficients.push(coefficient);
        for (let j = 0; j < coefficient; j++) {
            const randomNum = Math.floor(Math.random() * letters.length);
            const generatedCode = randomUpperCase(letters[randomNum]);
            encryption = encryption + generatedCode;
        }
        encryptedCoefficient = encryptedCoefficient + encryption + coeffsAsString[i];
        encryption = '';
    }
    console.log(' ~ Coefficient encryption is done. ');
    return { encryptedPassword, encryptedCoefficient, coefficients };
}

function decryptPassword(password, coefficients) {
    if (typeof coefficients !== 'string' || Array.isArray(coefficients) == false) {
        console.error('The type of coefficients is not valid!');
        console.error('It has to be either array or string...');
        return null;
    }

    if (typeof coefficients == 'string') {
        coefficients = coefficients.split('');
    }

    let decryptedPassword = '';
    let coefficientIndex = 0;
    console.log(' ~ Decrypting password... ');
    for (let i = coefficients[coefficientIndex]; i < password.length; i = i + (coefficients[coefficientIndex] + 1)) {
        decryptedPassword = decryptedPassword + password[i];
        coefficientIndex++;
    }
    console.log(' ~ Password decryption is done. ');
    return decryptedPassword;
}

function convertArrayToString(coeffs) {
    let numbers = '';
    for (let i = 0; i < coeffs.length; i++) {
        numbers = numbers + coeffs[i];
    }
    return numbers;
}

function useEncryption() {
    return { 
        randomUpperCase, 
        encryptPassword, 
        decryptPassword,
        convertArrayToString
    };
}

module.exports = { useEncryption };
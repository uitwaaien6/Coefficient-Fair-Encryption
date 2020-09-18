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
    const coefficients = [];
    const letters = 'qwertyuiopasdfghjklzxcvbnm1234567890!&?$'.split('');
    const complexity = 4;
    let coefficient = 0;
    let encryption = '';
    let encryptedPassword = '';
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
    return { encryptedPassword, coefficients };
}

function decryptPassword(password, coefficients) {
    const coefType = typeof coefficients;
    console.log(coefType);
    if (coefType == 'string') {
        let coefArray = [];
        for (let i = 0; i < coefficients.length; i++) {
            coefArray.push(coefficients[i])
        }
        coefficients = [...coefArray];
    }

    if (coefType != 'string' || coefType != 'array') {
        console.error('The type of coefficients is not valid!');
        console.error('It has to be either array or string...');
        return null;
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

function encryptCoefficients(coefficients) {
    let numbers = '';
    for (let i = 0; i < coefficients.length; i++) {
        numbers = numbers + coefficients[i];
    }
    const { encryptedPassword, coefficients } = encryptPassword(numbers);
    return { encryptedPassword, coefficients };
}

function useEncryption() {
    return { randomUpperCase, encryptPassword, decryptPassword, encryptCoefficients };
}

module.exports = { useEncryption };
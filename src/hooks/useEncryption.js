// COEFFICIENT FAIR ENCRYPTION SYSTEM. WRITTEN BY RUZGAR ATA OZKAN

/*
    The encryptPassword function takes 1 parameter which is your password obiously, and returns an array which has 2 elements in it. first element of the array is encrypted password and the second element is the coefficients that the letters of your password is buried into the encryption. So the decryptPassword function takes 2 parametes, first is the encrypted password and the second one is the coefficients of the encrypted password then it returns the decrypted password which is your normal password.
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
    const letters = 'qwertyuiopasdfghjklzxcvbnm1234567890'.split('');
    let coefficient = 0;
    let encryption = '';
    let newPassword = '';
    console.log(' ~ Encrypting password... ');
    for (let i = 0; i < password.length; i++) {
        coefficient = Math.floor(Math.random() * 3 + 4);
        coefficients.push(coefficient);
        for (let j = 0; j < coefficient; j++) {
            const randomNum = Math.floor(Math.random() * letters.length);
            const generatedCode = randomUpperCase(letters[randomNum]);
            encryption = encryption + generatedCode;
        }
        newPassword = newPassword + encryption + password[i];
        encryption = '';
    }
    console.log(' ~ Password encryption is done. ');
    return [newPassword, coefficients];
}

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

function useEncryption() {
    return [randomUpperCase, encryptPassword, decryptPassword];
}

module.exports = { useEncryption };
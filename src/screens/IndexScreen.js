import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { encryptPassword } from '../encryption/coefficientFairEncryption';
import jsonServer from '../api/jsonServer';

async function sendEncryptionsToServer(password, setDisplayPassword) {
    const { encryptedPassword, encryptedCoefficient, coefficients } = encryptPassword(password);
    const data = { encryptedPassword, encryptedCoefficient, coefficients };
    setDisplayPassword(encryptedPassword);
    try {
        const response = await jsonServer.post('/', data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return encryptedPassword;
}

function IndexScreen() {
    const [password, setPassword] = useState('');
    const [displayPassword, setDisplayPassword] = useState('');

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="Enter your password..."
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                value={password}
            />
            <Button
                title="Encrypt Password"
                onPress={async () => {
                    sendEncryptionsToServer(password, setDisplayPassword);
                    setPassword('');
                }}
            />
            <Text style={styles.encryptedPassword}>{displayPassword}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        margin: 15,
        padding: 8,
        fontSize: 24,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 1
    },
    encryptedPassword: {
        padding: 15,
        textAlign: 'center'
    }
})

export default IndexScreen;
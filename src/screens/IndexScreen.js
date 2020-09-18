import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useEncryption } from '../hooks/useEncryption';
import jsonServer from '../api/jsonServer';

async function sendEncryptionsToServer(password, setEncryptedPassword) {
    const { randomUpperCase, encryptPassword, decryptPassword, encryptCoefficients } = useEncryption();
    const { encryptedPassword, coefficients } = encryptPassword(password);
    const data = { encryptedPassword, coefficients };
    setEncryptedPassword(encryptedPassword);
    try {
        const response = await jsonServer.post('/', data);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
    return encryptionData;
}

function IndexScreen() {
    const [password, setPassword] = useState('');
    const [encryptedPassword, setEncryptedPassword] = useState('');

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
                onPress={() => {
                    setPassword('');
                    sendEncryptionsToServer(password, setEncryptedPassword);
                }}
            />
            <Text style={styles.encryptedPassword}>{encryptedPassword}</Text>
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
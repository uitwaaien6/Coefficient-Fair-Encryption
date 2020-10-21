import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { encryptPassword } from '../encryption/coefficientFairEncryption';
import jsonServer from '../api/jsonServer';

async function sendEncryptionsToServer(password, setDisplayPassword) {
    const encryptenData = encryptPassword(password);
    const { encryptedPassword } = encryptenData;
    setDisplayPassword(encryptedPassword);
    try {
        await jsonServer.post('/', encryptenData);
    } catch (error) {
        console.log(error.message);
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
                onPress={() => {
                    sendEncryptionsToServer(password, setDisplayPassword);
                    setPassword('');
                }}
            />
            <Text style={styles.encryptedPassword}>
                <Text style={styles.passwordLabel}>Encrypted Password: </Text>

                <Text> {displayPassword}</Text>
            </Text>
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
    passwordLabel: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    encryptedPassword: {
        padding: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})

export default IndexScreen;
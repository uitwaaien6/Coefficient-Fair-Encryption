import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import useEncryption from '../hooks/useEncryption';

function IndexScreen() {
    const [randomUpperCase, encryptPassword, decryptPassword] = useEncryption();
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    return (
        <View>
            <Text style={styles.title}>Enter your Password:</Text>
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
                    const encryptionData = encryptPassword(password);
                    const newPassword = encryptionData[0];
                    setNewPassword(newPassword);
                    setPassword('');

                    const data = {
                        encryptedPassword: encryptionData[0],
                        coefficients: encryptionData[1]
                    }

                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }

                    try {
                        const response = await fetch('/', options);
                        const response_json = await response.json();
                        console.log(response_json);
                    } catch (error) {
                        console.log(error);
                    }

                }}
            />
            <Text>Encrypted Password: {newPassword}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
    },
    input: {
        padding: 5,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 4
    }
})

export default IndexScreen;
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
                    const coefficients = encryptionData[1];
                    setNewPassword(newPassword);
                    setPassword('');
                    console.log(decryptPassword('2Gtg0G9vW8r1eB5ews8Jh9A2l7Y97pM4v3O9VDZF6hTr0U4Vpkhx5XQHn1PU9OtyLiIS939t1TYs5rwlVexuaalAR1uaVTXryi0HHmDeRXp8Wnn', [6,4,6,4,4,4,6,5,5,6,5,5,6,6,5,5,5,6]))

                    /*const data = {
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
                    }*/

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
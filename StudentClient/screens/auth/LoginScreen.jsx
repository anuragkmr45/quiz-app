import React, { useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import apiEndpoints from '../../service/api'

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Colors, { containerStyle } from "../../constants/colors"

const LoginScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [registrationNumber, setRegNo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const res = await apiEndpoints.login({ registrationNumber, password });

            const newToken = res.data.token;
            await SecureStore.setItemAsync('authToken', newToken);
            setIsLoading(false);

            navigation.navigate('Main');
        } catch (error) {
            setIsLoading(false);
            alert('Something went wrong, try again later');
        }
    };


    return (
        <View style={[containerStyle, { ...styles.container }]}>
            <Image source={require('../../assets/login.png')} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Registration Number"
                placeholderTextColor={Colors.text}
                value={registrationNumber}
                onChangeText={(text) => setRegNo(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.text}
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={!isLoading && handleLogin}>
                <Text style={styles.buttonText}>
                    {isLoading ? (
                        <Text>Please Wait ...</Text>
                    ) : (
                        <Text>Login</Text>
                    )}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.text}>Create an account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        // width: 350,
        height: 350,
        resizeMode: 'contain', 
        marginBottom: 20,
    },
    input: {
        backgroundColor: Colors.secondary,
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        color: Colors.text,
    },
    button: {
        backgroundColor: Colors.submit,
        padding: 15,
        borderRadius: 8,
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
    },
    text: {
        color: Colors.black,
        marginTop: 20,
    },
});

export default LoginScreen;

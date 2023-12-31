import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Colors from '../constants/colors';

const EnterQuiz = () => {
    const [quizId, setQuizId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        try {
            if (!quizId) {
                alert("Please Enter Quiz ID ")
            }
            if (!password) {
                alert('Please Enter  Password.');
                return;
            }

            if (quizId !== null || password !== null) {
                alert(`QuizID: ${quizId}, Password: ${password}`);
            }

        } catch (error) {
            console.error("Error while entering the quiz:", error)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Enter Quiz</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Quiz ID"
                    onChangeText={text => setQuizId(text)}
                    value={quizId}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Enter Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: 10
    },
    heading: {
        color: Colors.text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
});

export default EnterQuiz; 

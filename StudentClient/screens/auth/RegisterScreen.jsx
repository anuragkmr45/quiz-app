import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, Animated } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';

import apiEndpoints from '../../service/api'
import Colors, { containerStyle } from '../../constants/colors';
import { coursePlaceholder, courseOptions } from '../../.data/course'
import { batchPlaceholder, batchOptions } from '../../.data/batch'
import { branchPlaceholder, branchOptions } from '../../.data/branch'
import { sectionPlaceholder, sectionOptions } from '../../.data/section'

const RegistrationScreen = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [registrationNumber, setRegNo] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [batch, setBatch] = useState('');
    const [branch, setBranch] = useState('');
    const [section, setSection] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [animatedPadding] = useState(new Animated.Value(0));

    const disableBtn = !registrationNumber || !name || !course || !branch || !section || !batch || !password || !confirmPassword;
    const handleRegistration = async () => {
        try {

            setIsLoading(true);
            await apiEndpoints.student.register({ name, registrationNumber, email, password, batch, branch, section, course })

            setIsLoading(false);
            navigation.navigate('Login');
        } catch (error) {
            setIsLoading(false);
            console.error("Error while register : ", error)
            alert("User Already Exist")
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
            animatePadding(50);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
            animatePadding(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const animatePadding = (value) => {
        Animated.timing(animatedPadding, {
            toValue: value,
            duration: 350,
            useNativeDriver: false,
        }).start();
    };

    return (

        <Animated.ScrollView style={[containerStyle, { paddingTop: animatedPadding, marginVertical: 30 }]}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text style={styles.title}>Registration</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={Colors.text}
                value={name}
                onChangeText={text => setName(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Registration Number"
                placeholderTextColor={Colors.text}
                value={registrationNumber}
                onChangeText={value => setRegNo(value)}
                keyboardType='numeric'
                maxLength={11}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.text}
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType="email-address"  // Set keyboard type to email
            />

            <View style={{ ...styles.input, padding: 1 }}>
                <RNPickerSelect
                    placeholder={coursePlaceholder}
                    items={courseOptions}
                    onValueChange={(value) => setCourse(value)}
                    style={{
                        inputAndroid: {
                            color: Colors.text,
                        },
                    }}
                    value={course}
                />
            </View>

            <View style={{ ...styles.input, padding: 1 }}>
                <RNPickerSelect
                    placeholder={batchPlaceholder}
                    items={batchOptions}
                    onValueChange={(value) => setBatch(value)}
                    style={{
                        inputAndroid: {
                            color: Colors.text,
                        },
                    }}
                    value={batch}
                />
            </View>


            <View style={{ ...styles.input, padding: 1 }}>
                <RNPickerSelect
                    placeholder={branchPlaceholder}
                    items={branchOptions}
                    onValueChange={(value) => setBranch(value)}
                    style={{
                        inputAndroid: {
                            color: Colors.text,
                        },
                    }}
                    value={branch}
                />
            </View>

            <View style={{ ...styles.input, padding: 1 }}>
                <RNPickerSelect
                    placeholder={sectionPlaceholder}
                    items={sectionOptions}
                    onValueChange={(value) => setSection(value)}
                    style={{
                        inputAndroid: {
                            color: Colors.text,
                        },
                    }}
                    value={section}
                />
            </View>

            <View style={styles.passwordInput}>
                <TextInput
                    style={styles.passwordField}
                    placeholder="Password"
                    placeholderTextColor={Colors.text}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.text}
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />
            <TouchableOpacity style={styles.button} onPress={!isLoading && handleRegistration}
                disabled={disableBtn}
            >
                {
                    isLoading ? (
                        <Text style={styles.buttonText}>Please Wait ... </Text>
                    ) : (
                        <Text style={styles.buttonText} > Register</Text>
                    )
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>Already have an account?</Text>
            </TouchableOpacity>
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colors.text,
        fontSize: 24,
        marginVertical: 30,
    },
    input: {
        backgroundColor: Colors.secondary,
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        color: Colors.text,
    },
    passwordInput: {
        backgroundColor: Colors.secondary,
        width: '100%',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        color: Colors.text,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, passwordField: {
        flex: 1,
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
        color: Colors.text,
        marginTop: 20,
    },
});

export default RegistrationScreen;

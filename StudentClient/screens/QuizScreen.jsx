import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors, { containerStyle } from '../constants/colors';
import { questions } from '../constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(-1);
    const [timeLeft, setTimeLeft] = useState(100);

    const totalQuestions = questions.length;
    const isLastQuestion = currentQuestion === totalQuestions - 1;
    const isFirstQuestion = currentQuestion === 0;

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft((prev) => prev - 1);
            } else {
                clearInterval(interval);
                handleSubmit();
            }
        }, 20000);

        return () => { clearInterval(interval); }
    }, [timeLeft]);

    const fetchData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(`selectedOptions_${currentQuestion}`);
            if (storedData !== null) {
                setSelectedOption(parseInt(storedData));
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem(`selectedOptions_${currentQuestion}`, selectedOption.toString());
        } catch (error) {
            console.error('Error storing data in AsyncStorage:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentQuestion]);

    useEffect(() => {
        saveData();
    }, [selectedOption]);
    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        setSelectedOption(-1);
        setCurrentQuestion((prev) => prev + 1);
    };

    const handlePreviousQuestion = () => {
        setSelectedOption(-1);
        setCurrentQuestion((prev) => prev - 1);
    };

    const calculateScore = async () => {
        let score = 0;
        for (let i = 0; i < totalQuestions; i++) {
            try {
                let selectedOptionIndex = await AsyncStorage.getItem(`selectedOptions_${i}`);
                let selectedOption = parseInt(selectedOptionIndex);

                let correctAnswerIndex = questions[i].options.findIndex(option => option.isCorrect);

                if (selectedOption === correctAnswerIndex)
                    score += 1;

            } catch (error) {
                console.error('Error retrieving data from AsyncStorage:', error);
            }
        }
        return score;
    };


    const optionLetters = ['A', 'B', 'C', 'D'];

    const handleSubmit = async () => {
        let score = await calculateScore();
        navigation.replace('Result', {
            score,
            totalQuestions,
        });
    };

    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <Text style={styles.timer}>
                {timeLeft > 0 ? `Time left: ${timeLeft}` : 'Time is up!'}
            </Text>
            <View style={styles.questionContainer}>
                <Text style={styles.question}>
                    Q{currentQuestion + 1}.{questions[currentQuestion].question}
                </Text>
                {questions[currentQuestion].options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.option,
                            selectedOption === index && { backgroundColor: Colors.accent },
                        ]}
                        onPress={() => handleOptionSelect(index)}
                    >
                        <Text style={styles.optionText}>
                            {`${optionLetters[index]}: ${option.text}`}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                {
                    isFirstQuestion ? <View /> : (
                        <TouchableOpacity style={styles.button}  onPress={handlePreviousQuestion} disabled={currentQuestion === 0}>
                            <Text style={styles.btnText}>Previous</Text>
                        </TouchableOpacity>)
                }
                {isLastQuestion ? (
                    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Submit</Text>
                    </TouchableOpacity>
                ) : (
                        <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
                        <Text style={styles.btnText}>Next</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        gap: 10,
        padding: 5,
    },
    timer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.error,
        textAlign: 'center',
    },
    questionContainer: {
        marginTop: 20,
        width: '100%',
    },
    question: {
        fontSize: 18,
        marginBottom: 10,
        color: Colors.text,
    },
    option: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        borderWidth: 1,
        width: '100%',
        borderColor: "#ccc",
    },
    optionText: {
        fontSize: 16,
        color: Colors.text,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    submitBtn: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.secondaryDark,
        color: Colors.white,
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.submit,
        color: Colors.text,
        borderRadius: 5,
    },
    btnText: {
        color: Colors.white
    },
});

export default QuizScreen;

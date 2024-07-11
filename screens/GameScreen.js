import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import Back from '../components/Back';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomTextLabel from '../components/CustomTextLabel';
import CustomTextGeneral from '../components/CustomTextGeneral';
import CustomTextError from '../components/CustomTextError';

const GameScreen = ({ setCurrentScreen }) => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(4);
    const [timer, setTimer] = useState(9999999);
    const [hintUsed, setHintUsed] = useState(false);

    useEffect(() => {
    const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    if (timer === 0 || attempts === 0) {
        Alert.alert("Time's up!", 'You ran out of time or attempts.');
        setCurrentScreen('Start');
    }
    }, [timer, attempts]);

    const handleGuessSubmission = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) {
        Alert.alert('Invalid Input', 'Please enter a valid number.');
        return;
    }

    if (numGuess !== randomNumber) {
        setAttempts(prev => prev - 1);
        Alert.alert('Try Again', `Wrong guess! You have ${attempts - 1} attempts left.`);
    } else {
        Alert.alert('Congratulations!', 'You guessed the number correctly!');
        setCurrentScreen('Start');
    }
    };

    const handleUseHint = () => {
    if (!hintUsed) {
        Alert.alert('Hint', `The number is ${randomNumber > 50 ? 'greater' : 'less'} than 50.`);
        setHintUsed(true);
    } else {
        Alert.alert('Hint Used', 'You have already used your hint.');
    }
    };

    const handleRestart = () => {
    setCurrentScreen('Start');
    };

    return (
    <Back>
        <View style={styles.restartButtonContainer}>
            <Button title="Restart" onPress={handleRestart} color="#007AFF" />
        </View>
        <Card style={styles.card}>
            <Text style={styles.guessPrompt}>Guess A Number Between 1 & 100</Text>
            <TextInput
            style={styles.input} 
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
            />
            <Text style = {{ color: 'darkslategray'}}>Attempts left: {attempts}</Text>
            <Text style = {{ color: 'darkslategray'}}>Timer: {timer} seconds</Text>
            <Button title="Use a hint" onPress={handleUseHint} disabled={hintUsed} />
            <Button title="Submit guess" onPress={handleGuessSubmission} />
        </Card>
    </Back>
    );
};

const styles = StyleSheet.create({
    restartButtonContainer: {
        position: 'absolute',
        right: 10,
        top: 50, 
        zIndex: 1, // Make sure the button is clickable over other elements
        },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        width: '20%',
        borderBottomColor: 'blue', 
        borderBottomWidth: 1, 
    },
    guessPrompt: {
        fontSize: 18,     
        color: 'blue',    
        marginBottom: 10, 
        textAlign: 'center',
    },
    card:{
        marginTop: 115,
        width: '80%',  
        height: '50%',
        },
});

export default GameScreen;

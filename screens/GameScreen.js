import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Alert } from 'react-native';
import Back from '../components/Back';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomTextLabel from '../components/CustomTextLabel';
import CustomTextGeneral from '../components/CustomTextGeneral';
import CustomTextError from '../components/CustomTextError';
import colors from '../config/Color';

const GameScreen = ({ setCurrentScreen }) => {
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(4);
    const [timer, setTimer] = useState(60000);
    const [hintUsed, setHintUsed] = useState(false);
    const [hint, setHint] = useState("")
    const [gameState, setGameState] = useState('playing');
    const [gamePlaying, setGamePlaying] = useState(true);
    const [gameOverReason, setGameOverReason] = useState('');

    useEffect(() => {
    const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    if (timer === 0) {
            setGameOverReason('timeUp');
            setGameState('gameOver');
        } else if (attempts === 0) {
            setGameOverReason('attemptsOver');
            setGameState('gameOver');
        }
    }, [timer, attempts]);

    const handleGuessSubmission = () => {
        const numGuess = parseInt(guess);
        if (isNaN(numGuess)) {
            Alert.alert('Invalid Input', 'Please enter a valid number.');
            return;
        }

        if (numGuess !== randomNumber) {
            const newAttempts = attempts - 1;
            setAttempts(newAttempts);
            setGuess(''); 
            if (newAttempts > 0) {
                setGamePlaying(false);
            } else {
                setGameState('gameOver');
            }
        } else {
            Alert.alert('Congratulations!', 'You guessed the number correctly!');
            setCurrentScreen('Start');
        }
    };

    const handleUseHint = () => {
    if (!hintUsed) {
        const hintMessage = `The number is ${randomNumber > 50 ? 'greater' : 'equal to or less'} than 50.`;
        setHint(hintMessage);
        setHintUsed(true);
    } else {
        Alert.alert('Hint Used', 'You have already used your hint.');
    }
    };

    const handleRestart = () => {
    setCurrentScreen('Start');
    };

    const renderGameContent = () => {
        if (gameState === 'playing') {
            return (
                <Card style={styles.card}>
                    {gamePlaying && (
                    <View>
                        <CustomTextLabel style={styles.guessPrompt}>Guess A Number Between 1 & 100 test answer is:{randomNumber}</CustomTextLabel>
                        <CustomInput
                            style={styles.input} 
                            value={guess}
                            onChangeText={setGuess}
                            keyboardType="numeric"
                        />
                        <CustomTextGeneral>Attempts left: {attempts}</CustomTextGeneral>
                        <CustomTextGeneral>Timer: {timer} seconds</CustomTextGeneral>
                        <CustomTextLabel>{hint}</CustomTextLabel>
                        <View>
                            <CustomButton title="Use a hint" onPress={handleUseHint} disabled={hintUsed} />
                            <CustomButton title="Submit guess" onPress={handleGuessSubmission} />
                        </View>
                    </View>
                    )}
                    {!gamePlaying && (
                    <View>
                        <CustomTextLabel>You did not guess correct!</CustomTextLabel>
                        <View>
                            <CustomButton title="Guess again" onPress={() => {setGamePlaying(true) /*;setTimer(60) Maybe reset timer make more sense?*/}} />
                            <CustomButton title="End the game" onPress={() => {setGameState('gameOver'); setGameOverReason('userEnded')}} />
                        </View>
                    </View>
                    )}
                </Card>
            );
        } else if (gameState === 'gameOver') {
            let reasonText = '';
            switch (gameOverReason) { 
                case 'timeUp':
                    reasonText = 'Time is up!';
                    break;
                case 'attemptsOver':
                    reasonText = 'No attempts left!';
                    break;
                case 'userEnded':
                    reasonText = '';
                    break;
                default:
                    reasonText = '';
                    break;
            }
        
            return (
                <Card style={styles.card}>
                    <CustomTextLabel style={styles.label}>The game is over</CustomTextLabel>
                    <View style={styles.imageHolder}>
                        <Image source={require('../assets/sad.png')} style={styles.imageStyle} resizeMode="contain" />
                    </View>
                    <CustomTextLabel>{reasonText}</CustomTextLabel>
                </Card>
            );
        }
    };
    

    return (
        <Back>
            <View style={styles.restartButtonContainer}>
                <CustomButton title="Restart" onPress={handleRestart} color={colors.button.restart} />
            </View>
            {renderGameContent()}
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
        alignSelf: 'center',
    },
    guessPrompt: {
        marginBottom: 10, 
        textAlign: 'center',
    },
    card:{
        marginTop: 115,
        width: '80%',  
        height: '50%',
    },
    label:{
        alignSelf:'center',
    },
    imageStyle:{
        width: '100%',  
        height: '100%',
        overflow: 'visible',
    },
    imageHolder:{
        width: 150,
        height: 150,
        backgroundColor: colors.card, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default GameScreen;

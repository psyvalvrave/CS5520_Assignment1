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
    const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1); //this randomNumber can be directly use in render later to test how to reach successful page
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(4);
    const [timer, setTimer] = useState(60);
    const [hintUsed, setHintUsed] = useState(false);
    const [hint, setHint] = useState("")
    const [gameState, setGameState] = useState('playing'); //'playing', 'gameOver', 'gameWon' to show different page
    const [gamePlaying, setGamePlaying] = useState(true);
    const [gameOverReason, setGameOverReason] = useState('');

    //timer part, count down to 0
    useEffect(() => {
    const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    //game over with timer 
    useEffect(() => {
    if (timer === 0) {
            setGameOverReason('timeUp');
            setGameState('gameOver');
        } else if (attempts === 0) {
            setGameOverReason('attemptsOver');
            setGameState('gameOver');
        }
    }, [timer, attempts]);

    //different submissions to different results 
    const handleGuessSubmission = () => {
        const numGuess = parseInt(guess);
        if (isNaN(numGuess)||numGuess>100||numGuess<0) {
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
        } else if (numGuess === randomNumber){
            setTimer(99999999999999); //avoiding move back to losing screen once the user wins 
            setGameState('gameWon');
        }
    };
    //one-time simple hint
    const handleUseHint = () => {
    if (!hintUsed) {
        const hintMessage = `The number is ${randomNumber > 50 ? 'greater' : 'equal to or less'} than 50.`;
        setHint(hintMessage);
        setHintUsed(true);
    } else {
        Alert.alert('Hint Used', 'You have already used your hint.');
    }
    };

    //go back to the startScreen 
    const handleRestart = () => {
    setCurrentScreen('Start');
    };

    //conditional rendering, base on different game state will show different page  
    const renderGameContent = () => {
        if (gameState === 'playing') {
            return (
                <Card style={styles.card}>
                    {gamePlaying && (
                    <View>
                        <CustomTextLabel style={styles.guessPrompt}>Guess A Number Between 1 & 100 </CustomTextLabel>
                        <CustomInput
                            style={styles.input} 
                            value={guess}
                            onChangeText={setGuess}
                            keyboardType="numeric"
                        />
                        <CustomTextGeneral>Attempts left: {attempts} </CustomTextGeneral>
                        <CustomTextGeneral>Timer: {timer} seconds </CustomTextGeneral>
                        <CustomTextLabel>{hint}</CustomTextLabel>
                        <View>
                            <CustomButton title="Submit Guess" onPress={handleGuessSubmission} />
                            <CustomButton title="Use a hint" onPress={handleUseHint} disabled={hintUsed} />
                        </View>
                    </View>
                    )}
                    {!gamePlaying && (
                    <View>
                        <CustomTextLabel style={styles.label}>You did not guess correct! </CustomTextLabel>
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
            }//show different text base on different ways to lose the game. For user give up part, I did not add any text because there isn't text appeared on the demo. Add extra default just in case crashed. 
        
            return (
                <Card style={styles.card}>
                    <CustomTextLabel>The game is over </CustomTextLabel>
                    <View style={styles.imageHolder}>
                        <Image 
                            source={require('../assets/sad.png')} 
                            style={styles.imageStyle} 
                            resizeMode="contain" />
                    </View>
                    <CustomTextLabel>{reasonText} </CustomTextLabel>
                </Card>
            );
        } else if (gameState === 'gameWon') {
            return (
                <Card style={styles.card}>
                    <CustomTextLabel style={styles.label}>Congratulations! You guessed the number! </CustomTextLabel>
                    <CustomTextGeneral>Attempts used: {5 - attempts} </CustomTextGeneral>
                    <View style={styles.imageHolder}>
                    <Image
                        resizeMode="contain"
                        style={styles.imageStyle}
                        source={{ 
                            uri: `https://picsum.photos/id/${randomNumber}/100/100` }}
                    />
                    </View>
                    <CustomButton title="New Game" onPress={() => {
                        setGameState('playing');
                        setAttempts(4);
                        setTimer(60);
                        setRandomNumber(Math.floor(Math.random() * 100) + 1);
                        setHintUsed(false);
                    }} />
                </Card>
            );
        }
    };
    

    return (
        <Back>
            <View style={styles.flex}>
                <View style={styles.restartButtonContainer}>
                    <CustomButton title="Restart" onPress={handleRestart} color={colors.button.restart} />
                </View>
                <View style={styles.gap} />
                {renderGameContent()}
            </View>
        </Back>
    );
};

const styles = StyleSheet.create({
    restartButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 40,
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
        marginTop: 90,
        width: '80%',  
        height: '80%',
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
    },
    label:{
        textAlign:'center',
    },
    gap:{
        height: 20,
    },
    flex:{
        flex:1,
    },
});

export default GameScreen;

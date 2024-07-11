import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Game Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // You can adjust the background color as needed
    }
});

export default GameScreen;

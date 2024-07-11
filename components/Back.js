import React from 'react';
import { View, Text, StyleSheet, SafeAreaView  } from 'react-native';

const Back = ({ children, showWelcome }) => {
    return (
        <SafeAreaView style={styles.container}>
            {showWelcome && <Text style={styles.welcomeText}>Welcome</Text>}
            <View style={styles.cardContainer}>
                {children}
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'navy',
        width: '100%', 
        height: '100%', 
    },
    welcomeText: {
        fontSize: 24,
        color: 'white',
        marginBottom: 30, 
        alignSelf: 'center',
    },
    cardContainer: {
        width: '90%',
        height: '90%',
        alignItems: 'center',
    },
});

export default Back;

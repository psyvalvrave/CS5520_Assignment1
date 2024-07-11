import React from 'react';
import { View, Text, StyleSheet, SafeAreaView  } from 'react-native';
import colors from '../config/Color';
import { LinearGradient } from 'expo-linear-gradient';

const Back = ({ children, showWelcome }) => {
    return (
        <LinearGradient 
            style={styles.container}
            colors={[colors.primary, colors.secondary]} 
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}>
            {showWelcome && <Text style={styles.welcomeText}>Welcome</Text>}
            <View style={styles.cardContainer}>
                {children}
            </View>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        width: '100%', 
        height: '100%', 
    },
    welcomeText: {
        fontSize: 24,
        color: colors.text.general,
        marginBottom: 15, 
        alignSelf: 'center',
    },
    cardContainer: {
        width: '90%',
        height: '90%',
        alignItems: 'center',
    },
});

export default Back;

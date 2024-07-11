import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import colors from '../config/Color';

const CustomButton = ({ title, onPress, disabled, color = "#007AFF" }) => {
    return (
        <View style={styles.buttonContainer}>
        <Button title={title} disabled={disabled} onPress={onPress} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 5, // Adds vertical spacing for each button
    },
});

export default CustomButton;

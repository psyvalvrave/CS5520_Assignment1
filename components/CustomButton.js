import React from 'react';
import { Button, StyleSheet, View } from 'react-native';


const CustomButton = ({ title, onPress, disabled, color = "#007AFF", style }) => {
    return (
        <View style={[styles.buttonContainer, style]}>
        <Button title={title} disabled={disabled} onPress={onPress} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 5, 
    },
});

export default CustomButton;

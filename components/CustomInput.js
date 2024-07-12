import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../config/Color';

const CustomInput = ({ value, onChangeText, placeholder, onBlur, keyboardType, style}) => {
    return (
        <TextInput
        style={[styles.input, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onBlur={onBlur}
        keyboardType={keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderBottomColor: colors.input.border, 
        borderBottomWidth: 1, 
        marginBottom: 10,
        padding: 10,
        width: '100%', 
    },
});

export default CustomInput;

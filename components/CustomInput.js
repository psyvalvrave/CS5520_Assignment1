import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../config/Color';

const CustomInput = ({ value, onChangeText, placeholder, onBlur}) => {
    return (
        <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        onBlur={onBlur}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomColor: 'blue', 
        borderBottomWidth: 1, 
        marginBottom: 10,
        padding: 10,
        width: 250, 
    },
});

export default CustomInput;

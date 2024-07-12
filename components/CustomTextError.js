import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/Color';

const CustomTextError = ({ children, style }) => {
    return (
        <Text style={[styles.text, style]}>
        {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: colors.text.error,
        fontSize: 12,
        marginBottom: 5,
        padding: 5,
    },
});

export default CustomTextError;

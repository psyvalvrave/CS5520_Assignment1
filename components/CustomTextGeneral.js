import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/Color';

const CustomTextGeneral = ({ children, style }) => {
    return (
        <Text style={[styles.text, style]}>
        {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: colors.text.general,
        marginBottom: 5,
        textAlign: 'center',
    },
});

export default CustomTextGeneral;

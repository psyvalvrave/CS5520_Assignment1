import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/Color';

const CustomTextLabel = ({ children, style }) => {
    return (
        <Text style={[styles.label, style]}>
        {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        color: colors.text.label,
        marginLeft: 5,
        alignSelf: 'flex-start',
    },
});

export default CustomTextLabel;

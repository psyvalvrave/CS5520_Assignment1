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
        fontSize: 14,
        color: colors.text.label,
        marginLeft: 5,
        padding: 5,
        alignSelf:'center',
    },
});

export default CustomTextLabel;

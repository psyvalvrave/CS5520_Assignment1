import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/Color';

const Card = ({ children, style  }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex:1,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    elevation: 12,
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 10,
    width: 300, 
    height: 300,
    marginBottom: 50,
    alignItems: 'center',  
    justifyContent: 'space-evenly',
  },
});

export default Card;

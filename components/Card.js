import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children }) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 8,
    backgroundColor: 'gray',
    padding: 20,
    borderRadius: 10,
    width: 300, 
    height: 500,
    alignItems: 'center',  
    justifyContent: 'center',
  },
});

export default Card;

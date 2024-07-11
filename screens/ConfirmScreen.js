import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Card from '../components/Card';

const ConfirmScreen = ({ visible, name, email, onHide, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onHide}
    >
      <View style={styles.centeredView}>
        <View>
          <Card style={styles.card}>
            <Text style={styles.confirmText}>Hello {name}</Text> 
            <Text style={styles.confirmText}>Here is the email that you enter: {email}</Text>
            <Text style={styles.confirmText}>If it is not correct, please go back and enter again.</Text>
            <View style={styles.buttonContainer}>
              <Button title="Back to Edit" onPress={onHide} color="#007AFF" />
              <Button title="Confirm and Continue" onPress={onConfirm} color="#4CAF50" />
            </View>
          </Card>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  confirmText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    color: "blue",
    alignSelf: 'flex-start',
  },
  card:{
    marginTop: 115,
    width: '80%',  
    height: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  }
});

export default ConfirmScreen;

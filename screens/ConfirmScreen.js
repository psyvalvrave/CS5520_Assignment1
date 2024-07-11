import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ConfirmScreen = ({ visible, name, email, onEdit, onConfirm }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please confirm your details:</Text>
          <Text style={styles.userData}>Name: {name}</Text>
          <Text style={styles.userData}>Email: {email}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={onEdit} color="#2196F3" />
            <Button title="Confirm" onPress={onConfirm} color="#F44336" />
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent gradient background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userData: {
    marginBottom: 10,
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default ConfirmScreen;

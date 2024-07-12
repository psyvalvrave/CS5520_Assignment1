import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import CustomTextLabel from '../components/CustomTextLabel';
import colors from '../config/Color';

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
            <CustomTextLabel>Hello {name}</CustomTextLabel> 
            <CustomTextLabel>Here is the email that you enter: {email}</CustomTextLabel>
            <CustomTextLabel>If it is not correct, please go back and enter again.</CustomTextLabel>
            <View style={styles.buttonContainer}>
              <CustomButton title="Go Back" onPress={onHide} color={colors.button.start} />
              <CustomButton title="Continue" onPress={onConfirm} color={colors.button.hint} />
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
    backgroundColor: colors.transparent,
  },
  card:{
    marginTop: 115,
    width: '90%',  
    height: '50%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
    marginTop: 20,
  }
});

export default ConfirmScreen;

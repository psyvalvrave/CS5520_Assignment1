import React, { useState } from 'react';
import { TextInput, Button, Text, StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import Back from '../components/Back';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomTextLabel from '../components/CustomTextLabel';
import CustomTextError from '../components/CustomTextError';
import ConfirmScreen from './ConfirmScreen';
import colors from '../config/Color';


const StartScreen = ({ setCurrentScreen }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [confirmVisible, setConfirmVisible] = useState(false);


  const validateName = (name) => {
    if (!name.match(/^[a-zA-Z ]+$/)) {
      return 'Name must be non-numeric and contain only letters.';
    } else if (name.length <= 1) {
      return 'Name must be more than one character.';
    }
    return '';
  };

  const validateEmail = (email) => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleBlurName = () => {
    const error = validateName(name);
    setErrors(prev => ({ ...prev, name: error }));
  };

  const handleBlurEmail = () => {
    const error = validateEmail(email);
    setErrors(prev => ({ ...prev, email: error }));
  };

  const handleStart = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    if (!nameError || !emailError  || checkboxSelected) {
      setConfirmVisible(true);
    }
    else{
      setErrors({ name: nameError, email: emailError });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCheckboxSelected(false);
    setErrors({ name: '', email: '' });
  };

  return (
    <Back showWelcome={true}>
      <Card>
        <CustomTextLabel>Name</CustomTextLabel>
        <CustomInput
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
          onBlur={handleBlurName}
        />
        {errors.name ? <CustomTextError>{errors.name}</CustomTextError> : null}
        <CustomTextLabel>Email</CustomTextLabel>
        <CustomInput
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          onBlur={handleBlurEmail}
        />
        {errors.email ? <CustomTextError>{errors.email}</CustomTextError> : null}

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={checkboxSelected}
            onValueChange={setChecked => setCheckboxSelected(setChecked)}
            color={checkboxSelected ? '#4630EB' : undefined}
          />
          <CustomTextLabel style={styles.checkLabel}>I am not a robot</CustomTextLabel>
        </View>
        <View style={styles.buttonContainer}>
            <CustomButton title="Reset" onPress={handleReset} color={colors.button.reset} />
            <CustomButton title="Start" onPress={handleStart} disabled={!checkboxSelected || errors.name || errors.email} color={colors.button.start} />
        </View>
      </Card>
      <ConfirmScreen
        visible={confirmVisible}
        name={name}
        email={email}
        onHide={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          setCurrentScreen('Game'); 
        }}
      />
    </Back>
  );
};

const styles = StyleSheet.create({
  checkLabel: {
    margin:20,
  },
  checkboxContainer: {
    flexDirection: 'row',  
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    margin: 8,
  },
  buttonContainer: {
    flexDirection: 'row',   
    justifyContent: 'space-around', 
    width: '100%',
  }
});

export default StartScreen;

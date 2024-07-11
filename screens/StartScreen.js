import React, { useState } from 'react';
import { TextInput, Button, Text, StyleSheet, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import Back from '../components/Back';
import Card from '../components/Card';
import ConfirmScreen from './ConfirmScreen';


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
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Enter your name"
          onBlur={handleBlurName}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          onBlur={handleBlurEmail}
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={checkboxSelected}
            onValueChange={setChecked => setCheckboxSelected(setChecked)}
            color={checkboxSelected ? '#4630EB' : undefined}
          />
          <Text style={styles.checkLabel}>I am not a robot</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Button title="Reset" onPress={handleReset} color="#a61c3a" />
            <Button title="Start" onPress={handleStart} disabled={!checkboxSelected || errors.name || errors.email} color="#007AFF" />
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
  input: {
    height: 40,
    borderBottomColor: 'blue', 
    borderBottomWidth: 1, 
    marginBottom: 10,
    padding: 10,
    width: 250, 
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 5,
    alignSelf: 'flex-start',
  },
  checkLabel: {
    fontSize: 16,
    color: 'blue',
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

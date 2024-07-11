import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Start');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Confirm':
        return <ConfirmScreen setCurrentScreen={setCurrentScreen} />;
      case 'Game':
        return <GameScreen setCurrentScreen={setCurrentScreen} />;
      case 'Start':
      default:
        return <StartScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

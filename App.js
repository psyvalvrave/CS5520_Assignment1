import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar  } from 'react-native';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Start');

  const renderScreen = () => {
    //conditional rendering for game screen part. The confirm screen is built with modal, so do not need to switching screen. 
    switch (currentScreen) {
      case 'Game':
        return <GameScreen setCurrentScreen={setCurrentScreen} />;
      case 'Start':
        return <StartScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <StartScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content"/>
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

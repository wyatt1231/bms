/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import store from './Services/Store';
import Routes from './components/Router';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import GlobalFont from 'react-native-global-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from './components/RootNavigation';
const App = () => {
  useEffect(() => {
    const globalfont = async () => {
      const val = await AsyncStorage.getItem('tokenizer');
      let fontName = 'SFUIDisplay-Heavy';
      GlobalFont.applyGlobal(fontName);
      if (val !== null) {
        navigationRef.navigate('Dashboard');
      } else {
        navigationRef.navigate('Home');
      }
    };
   globalfont();
  
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;

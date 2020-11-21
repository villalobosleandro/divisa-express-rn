/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { AppNavigator } from './src/lib/navigation';
global.Constant = require('./src/lib/constant');

const App = () => {

  return(
      <React.Fragment>
        <AppNavigator/>
      </React.Fragment>
  )
};

export default App;

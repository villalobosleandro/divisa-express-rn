import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from './../containers/Login';
import { Home } from './../containers/Home';
import { Sending } from './../containers/Sending';
import { Aggregate } from './../containers/Aggregate';

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator headerMode='none'>
        {/* <Screen name='Login' component={Login}/> */}
        <Screen name='Home' component={Home}/>
        <Screen name='Aggregate' component={Aggregate}/>
        <Screen name='Sending' component={Sending}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>
);


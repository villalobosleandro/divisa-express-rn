import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthLoadingScreen } from './../containers/AuthLoadingScreen';
import { Login } from './../containers/Login';
import { Home } from './../containers/Home';
import { Sending } from './../containers/Sending';
import { Aggregate } from './../containers/Aggregate';
import { RegisterUser } from './../containers/RegisterUser';
import { History } from './../containers/History';


const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
    <Navigator headerMode='none'>
        <Screen name='AuthLoadingScreen' component={AuthLoadingScreen}/>
        <Screen name='Login' component={Login}/>
        <Screen name='Home' component={Home}/>
        <Screen name='Aggregate' component={Aggregate}/>
        <Screen name='Sending' component={Sending}/>
        <Screen name='RegisterUser' component={RegisterUser}/>
        <Screen name='History' component={History}/>
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator/>
    </NavigationContainer>
);


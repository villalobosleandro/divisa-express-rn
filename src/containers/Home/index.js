import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';

import {Header} from './../../components/header';

export const Home = props => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    _searchUserId()
  }, []);

  const _searchUserId = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
      // console.log('Homeeeeeee ', userId);
    } catch (e) {}
  }

  const _confirmLogout = () => {
      Alert.alert(
          'Esta seguro de cerrar session?',
          '',
          [
              {text: 'Cancelar', style: 'cancel'},
              {text: 'OK', style: 'success', onPress: () => {
                      _logout()
                  }},
          ],
          {cancelable: false}
      );
  };

  const _logout = () => {
    setLoading(true);
    const data = {
      userId: userId
    }
    axios({
        method: 'put',
        timeout: 1000,
        url: 'http://web.dev10.codecraftdev.com/api/v1/logout',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        console.log('responseee ', response.data.userLoggedOut);
        if(response.data.userLoggedOut) {
          AsyncStorage.removeItem('userId');
          setLoading(false);
          props.navigation.navigate('Login');
        }
        //response.data.userLoggedOut si existe borro token y mando al login
        setLoading(false);
    })
    .catch(error => {
        console.log('error ', error);
        setLoading(false);
        Toast.show(`Error ${error}`, Toast.LONG);
    })
  }

  return(
    <View style={{flex: 1, backgroundColor: '#142444', alignItems: 'center', justifyContent: 'center', width: '100%'}}>

      {
        loading && 
        <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
      }

      {
        !loading &&
        <View style={{flex: 1, backgroundColor: '#142444', alignItems: 'center', justifyContent: 'center', width: '100%'}}> 
          <Header
            hideIcon={true}
          />

          <View style={{flex: 7, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Aggregate')}>
              <View style={{borderWidth: 4, width: 80, height: 80, borderColor: '#1fc85f', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'account-plus-outline'}
                  type={'material-community'}
                  size={50}
                  color={'#1fc85f'}
                />
              </View>

              <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingTop: 5}}>Agregar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('History')}>
              <View style={{borderWidth: 4, width: 80, height: 80, borderColor: '#0484a4', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'file-document-edit-outline'}
                  type={'material-community'}
                  size={50}
                  color={'#0484a4'}
                />
              </View>

              <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingTop: 5}}>Registro</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Sending')}>
              <View style={{borderWidth: 4, width: 80, height: 80, borderColor: '#ebe678', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'telegram'}
                  type={'material-community'}
                  size={50}
                  color={'#ebe678'}
                />
              </View>

              <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingTop: 5}}>Enviar</Text>
            </TouchableOpacity>

          </View>

          <View style={{flex: 2, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10}}> 
            <Button
              title="CERRAR SESSION"
              containerStyle={{width: 200}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#1fc85f'}}
              onPress={() => _confirmLogout()}
            />
          </View>
        </View>
    }
    </View>
  );
}
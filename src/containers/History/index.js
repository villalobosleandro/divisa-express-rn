import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';

import { Header } from './../../components/header';

export const History = props => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [userId, setUserId] = useState('');
  

  useEffect(() => {
    _searchUserId()
  }, []);

  const _searchUserId = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch (e) {}
  };

  

  return(
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#142444'}}>

      {
        loading && 
        <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
      }

      {
        !loading &&
        <View>
          <Header
            navigation={props.navigation}
          />

          <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{borderWidth: 4, width: 60, height: 60, borderColor: '#0484a4', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'file-document-edit-outline'}
                  type={'material-community'}
                  size={40}
                  color={'#0484a4'}
                />
              </View>

              <Button
                title="Registro"
                containerStyle={{width: 300}}
                buttonStyle={{borderRadius: 20, backgroundColor: '#0484a4'}}
              />
          </View>

          
          
          <View style={{flex: 6, alignSelf: 'stretch', alignItems: 'flex-start', justifyContent: 'space-evenly'}}>
         
            <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Movimientos Realizados</Text>
            </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}>
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Hoy</Text>
              
            </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}>
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Esta Semana</Text>
            </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}>
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Semana Pasada</Text>
            </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}>
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Mes pasado</Text>
            </View>

            
          </View>

         
        </View>
      }
    </View>
  )
}
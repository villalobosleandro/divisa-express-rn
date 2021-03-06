import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-simple-toast';

import { Header } from './../../components/header';

export const Aggregate = props => {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName]= useState('');
  const [govId, setGovId] = useState('');
  const [number, setNumber] = useState('');
  const [govIdType, setGovIdType] = useState('cedula');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    _searchUserId()
  }, []);

  const _searchUserId = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch (e) {}
  };

  const _createRegister = () => {
    setLoading(true);
    const data = {
        userId: userId,
        fullName: fullName,
        govId: govId,
        number: number,
        govIdType: govIdType,
        phone: phone,
        email: email
    };

    axios({
        method: 'put',
        timeout: 10000,
        url: 'http://web.dev10.codecraftdev.com/api/v1/registerAccount',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        // console.log('responseee ', response.data);
        // if(response.data.bankAccountCreated) {
        //
        //
        // }
        Toast.show(`Cuenta creada satisfactoriamente`);
        setEmail('');
        setPhone('');
        setFullName('');
        setGovId('');
        setGovIdType('cedula');
        setNumber('');
        setLoading(false);
    })
    .catch(error => {
        console.log('error ', error);
        setLoading(false);
        Toast.show(`Error Vuelve a intentar`, Toast.LONG);
    })
  };

  const _validateNumberOfIdentity = () => {
    switch(govIdType){
      case 'cedula':
        return 8;

      case 'rif':
        return 9;

      case 'pasaporte':
        return 7;
    }
  };

  return(
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#142444'}}>

      {
        loading &&
        <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
      }

      {
        !loading &&
        <KeyboardAvoidingView>
          <Header
            navigation={props.navigation}
          />

          <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{borderWidth: 4, width: 60, height: 60, borderColor: '#1fc85f', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'account-plus-outline'}
                  type={'material-community'}
                  size={40}
                  color={'#1fc85f'}
                />
              </View>

              <Button
                title="Agregar"
                containerStyle={{width: 300}}
                buttonStyle={{borderRadius: 20, backgroundColor: '#0484a4'}}
              />
          </View>

          <View style={{flex: 6, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-evenly'}}>
            <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Numero de Cuenta:</Text>
              <TextInput
                style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, color: '#fff', paddingHorizontal: 10 }}
                onChangeText={number => setNumber(number)}
                keyboardType={'numeric'}
                autoCapitalize={'none'}

              />
            </View>

              <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
                  <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Numero de telefono:</Text>
                  <TextInput
                      style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, color: '#fff', paddingHorizontal: 10 }}
                      onChangeText={phone => setPhone(phone)}
                      keyboardType={'numeric'}
                      autoCapitalize={'none'}

                  />
              </View>

              <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
                  <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Email:</Text>
                  <TextInput
                      style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, color: '#fff', paddingHorizontal: 10 }}
                      onChangeText={email => setEmail(email)}
                      autoCapitalize={'none'}
                  />
              </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Nombre y Apellido:</Text>
              <TextInput
                style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, color: '#fff', paddingHorizontal: 10 }}
                onChangeText={fullName => setFullName(fullName)}
                autoCapitalize={'none'}
              />
            </View>

            <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Identificacion:</Text>
              <View style={{flexDirection: 'row'}}>
                <Picker
                  selectedValue={govIdType}
                  style={{height: 50, width: 100, color: '#fff'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setGovIdType(itemValue)
                  }>
                  <Picker.Item label="V - Cedula" value="cedula" color={'#000'}/>
                  <Picker.Item label="J - RIF" value="rif" color={'#000'}/>
                  <Picker.Item label="E - Extranjero" value="pasaporte" color={'#000'}/>
                </Picker>
                <TextInput
                  style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, width: 250, color: '#fff', paddingHorizontal: 10 }}
                  onChangeText={govId => setGovId(govId)}
                  keyboardType={'numeric'}
                  maxLength={_validateNumberOfIdentity()}
                  autoCapitalize={'none'}

                />
              </View>

            </View>
          </View>

          <View style={{flex: 2, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10}}>
            <Button
              title="G U A R D A R"
              containerStyle={{width: 200}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#1fc85f'}}
              onPress={() => _createRegister()}
            />
          </View>
        </KeyboardAvoidingView>
      }
    </View>
  )
}

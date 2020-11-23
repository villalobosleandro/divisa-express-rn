import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

import { styles } from './styles';

export const RegisterUser = props => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [govId, setGovId] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [govIdType, setGovIdType] = useState('cedula');

  const CheckTextInputIsEmptyOrNot = () => {
    if (password === '' || username === '' || firstName === '' || lastName === '' || govId === '' || email === '') {
        Toast.show(`Please fill in all the fields`, Toast.LONG);
    }
    else {
        _register();
    }
  };

  const _register = () => {
    setLoading(true);
    const data = {
      name: firstName,
      lastName: lastName,
      govId: govId,
      email: email,
      username: username,
      password: password,
      govIdType: govIdType
    };
      axios({
          method: 'put',
          timeout: 10000,
          url: 'http://web.dev10.codecraftdev.com/api/v1/signup',
          data: data,
          headers: {
              'Content-Type': 'application/json'
          },
      })
        .then(response => {
            if(response.status === 202) {
              Toast.show(response.data.error, Toast.LONG);
            }else if(response.status === 200 &&  response.data.userCreated) {
              Toast.show('Usuario creado satisfactoriamente', Toast.LONG);
            }
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            Toast.show(`Error ${error}`, Toast.LONG);
        })

  }

  const _validateNumberOfIdentity = () => {
    switch(govIdType){
      case 'cedula':
        return 8;

      case 'rif':
        return 9;

      case 'pasaporte':
        return 7;
    }
  }

  return(
    <View style={styles.container}>

      {
        loading &&
        <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
      }

      {
        !loading &&
        <KeyboardAvoidingView style={{flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',}}>

          <View style={{alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: 80}}>
            <Image
              style={{width: 80, height: 90}}
              source={require('./../../assets/images/logo3.png')}
              resizeMode={'contain'}
            />

            <Icon
              name={'menu'}
              type={'material-community'}
              // color={'#0484a4'}
              color={'#fff'}
              size={30}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            />

          </View>

          <View style={styles.textInputContainer}>

            <View style={{flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#fff'}}>
                <Picker
                  selectedValue={govIdType}
                  style={{height: 50, width: 100, color: '#fff'}}
                  onValueChange={(itemValue, itemIndex) =>{
                      setGovIdType(itemValue);
                      setGovId('');
                    }
                  }>
                  <Picker.Item label="V - Cedula" value="cedula" color={'#000'}/>
                  <Picker.Item label="J - RIF" value="rif" color={'#000'}/>
                  <Picker.Item label="E - Extranjero" value="pasaporte" color={'#000'}/>
                </Picker>

                <TextInput
                  placeholder='Number of identity'
                  placeholderTextColor={'#fff'}
                  style={{ height: 50, width: 250, color: '#fff', paddingHorizontal: 10 }}
                  onChangeText={govId => setGovId(govId)}
                  keyboardType={'numeric'}
                  autoCapitalize={'none'}
                  maxLength={_validateNumberOfIdentity()}
                  value={govId}
                />
            </View>

            <TextInput
                placeholder='First Name'
                placeholderTextColor={'#fff'}
                style={{ height: 50, width: 350, color: '#fff', paddingHorizontal: 10, borderBottomWidth: 2, borderBottomColor: '#fff' }}
                onChangeText={firstName => setFirstName(firstName)}
                autoCapitalize={'none'}
                // value={firstName}
              />

              <TextInput
                placeholder='Last Name'
                placeholderTextColor={'#fff'}
                style={{ height: 50, width: 350, color: '#fff', paddingHorizontal: 10, borderBottomWidth: 2, borderBottomColor: '#fff' }}
                onChangeText={lastName => setLastName(lastName)}
                autoCapitalize={'none'}
                // value={lastName}
              />

              <TextInput
                placeholder='Email'
                placeholderTextColor={'#fff'}
                style={{ height: 50, width: 350, color: '#fff', paddingHorizontal: 10, borderBottomWidth: 2, borderBottomColor: '#fff' }}
                onChangeText={email => setEmail(email)}
                autoCapitalize={'none'}
                // value={email}
              />

              <TextInput
                placeholder='Username'
                placeholderTextColor={'#fff'}
                style={{ height: 50, width: 350, color: '#fff', paddingHorizontal: 10, borderBottomWidth: 2, borderBottomColor: '#fff' }}
                onChangeText={username => setUsername(username)}
                autoCapitalize={'none'}
                // value={username}
              />

              <TextInput
                placeholder='Password'
                placeholderTextColor={'#fff'}
                style={{ height: 50, width: 350, color: '#fff', paddingHorizontal: 10, borderBottomWidth: 2, borderBottomColor: '#fff' }}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
                autoCapitalize={'none'}
                // value={password}
              />
          </View>

          <View style={styles.buttonLoginContainer}>
            <Button
              title="R E G I S T R A R"
              type="outline"
              containerStyle={{width: 300}}
              buttonStyle={{borderColor: '#fff'}}
              titleStyle={{color: '#fff'}}
              onPress={() => CheckTextInputIsEmptyOrNot()}
            />
          </View>

          <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            onBackButtonPress={() => setModalVisible(!modalVisible)}
            backdropOpacity={0.4}
          >
            <TouchableOpacity
              style={{ backgroundColor: '#fff', height: 60, width: 200,
                position: 'absolute', right: 15, top: 40, alignItems: 'center',
                justifyContent: 'center', borderRadius: 20,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
                props.navigation.navigate('Login');
              }}
            >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Login</Text>
            </TouchableOpacity>
          </Modal>

        </KeyboardAvoidingView>
      }
    </View>
  );
}

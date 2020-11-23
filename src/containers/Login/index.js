import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles';

export const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const CheckTextInputIsEmptyOrNot = () => {
      if (password === '' || username === '') {
          Toast.show(`Please fill in all the fields`, Toast.LONG);
      }
      else {
          _login();
      }
  };

  const _login = () => {
    setLoading(true);
    const data = {
      usernameEmail: username,
      password: password
    };

    axios({
        method: 'put',
        timeout: 10000,
        url: 'http://web.dev10.codecraftdev.com/api/v1/login',
        data: data,
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if(response.status === 202) { //si el usuario o contraseña estan mal
          Toast.show(response.data.error, Toast.LONG);
        }else if(response.status === 200 &&  response.data.userLogged) { // si todo esta bien
          AsyncStorage.setItem('userId', response.data._id)
          props.navigation.navigate('Home')

        }
        setLoading(false);
    })
    .catch(error => {
        setLoading(false);
        Toast.show(`Error ${error}`, Toast.LONG);
    })
    // if(username === 'mail@mail.com' && password === 'asd123') {
    //   props.navigation.navigate('Home')
    // }else {
    //   Toast.show(`Error Authentication username or password invalid.`, Toast.LONG);
    // }
  }

  return(
    <View style={styles.container}>
      {
        loading &&
        <View style={styles.container}>
          <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
        </View>

      }

      {
        !loading &&
        <KeyboardAvoidingView style={styles.container}>
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
            <Input
              placeholder='Correo o usuario'
              // value={username}
              inputStyle={{color: '#fff'}}
              onChangeText={username => setUsername(username)}
              autoCapitalize={'none'}
              leftIcon={
                <Icon
                  name='email'
                  type={'material-community'}
                  size={24}
                  color='#fff'
                />
              }
            />

            <Input
              placeholder='Contraseña'
              // value={password}
              inputStyle={{color: '#fff'}}
              onChangeText={password => setPassword(password)}
              autoCapitalize={'none'}
              secureTextEntry={true}
              leftIcon={
                <Icon
                  name='lock'
                  type={'material-community'}
                  size={24}
                  color='#fff'
                />
              }
            />
          </View>

          <View style={styles.buttonLoginContainer}>
            <Button
              title="L O G I N"
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
                props.navigation.navigate('RegisterUser');
              }}
            >
                <Text style={{fontWeight: 'bold', fontSize: 20}}>Registrar Usuario</Text>
            </TouchableOpacity>
          </Modal>
        </KeyboardAvoidingView>
      }

    </View>
  );
}

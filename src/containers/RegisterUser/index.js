import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';
import Spinner from 'react-native-spinkit';
import axios from 'axios';

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
      password: password
    };
      axios({
          method: 'put',
          timeout: 1000,
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

  return(
    <View style={styles.container}>

      {
        loading && 
        <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#0484a4'}/>
      }

      {
        !loading &&
        <KeyboardAvoidingView>

          <View style={{alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: 80}}>
            <Image
              style={{width: 80, height: 90}}
              source={require('./../../assets/images/logo3.png')}
              resizeMode={'contain'}
            />
            
            <Icon
              name={'menu'}
              type={'material-community'}
              color={'#0484a4'}
              size={30}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            />
            
          </View>

          <View style={styles.textInputContainer}>
            
            <Input
                placeholder='First Name'
                inputStyle={{color: '#fff'}}
                onChangeText={firstName => setFirstName(firstName)}
                // value={firstName}
              />

              <Input
                placeholder='Last Name'
                inputStyle={{color: '#fff'}}
                onChangeText={lastName => setLastName(lastName)}
                // value={lastName}
              />

              <Input
                placeholder='Number of identity'
                inputStyle={{color: '#fff'}}
                onChangeText={govId => setGovId(govId)}
                // value={govId}
              />
              
              <Input
                placeholder='Email'
                inputStyle={{color: '#fff'}}
                onChangeText={email => setEmail(email)}
                // value={email}
              />

            <Input
                placeholder='Username'
                inputStyle={{color: '#fff'}}
                onChangeText={username => setUsername(username)}
                // value={username}
              />

              <Input
                placeholder='Password'
                inputStyle={{color: '#fff'}}
                onChangeText={password => setPassword(password)}
                secureTextEntry={true}
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
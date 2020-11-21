import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';

import { styles } from './styles';

export const Login = props => {
  const [username, setUsername] = useState('mail@mail.com');
  const [password, setPassword] = useState('asd123');

  const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const CheckTextInputIsEmptyOrNot = () => {
      if (password === '' || username === '') {
          Toast.show(`Please fill in all the fields`, Toast.LONG);
      }
      else {
          if (!validateEmail(username)) {
              Toast.show(`Invalid Email`, Toast.LONG);
          } else {
              _login();
          }
      }
  };

  const _login = () => {
    if(username === 'mail@mail.com' && password === 'asd123') {
      console.log('todo bien');
      props.navigation.navigate('Home')
    }else {
      Toast.show(`Error Authentication username or password invalid.`, Toast.LONG);
    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./../../assets/images/logo.png')}
          style={{width: 200, height: 100}}
          resizeMode={'cover'}
        />        
      </View>

      <View style={styles.textInputContainer}>
        <Input
          placeholder='Email'
          value={username}
          inputStyle={{color: '#fff'}}
          onChangeText={username => setUsername(username)}
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
          placeholder='Password'
          value={password}
          inputStyle={{color: '#fff'}}
          onChangeText={password => setPassword(password)}
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
    </View>
  );
}
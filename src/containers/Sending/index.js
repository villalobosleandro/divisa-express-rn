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

export const Sending = props => {
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [bankAccountId, setBankAccountId] = useState('');
  const [userId, setUserId] = useState('');
  const [account, setAccount] = useState('cuenta1')
  const options = {
    title: 'Select Avatar',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const cuentas = [
    {name: 'cuenta2', number: '12345678'},
    {name: 'cuenta3', number: '0000000'},
    {name: 'cuenta4', number: '1111111'},
    {name: 'cuenta5', number: '2222222'},
    {name: 'cuenta6', number: '3333333'},
    {name: 'cuenta7', number: '44444444'},
  ];
  

  useEffect(() => {
    _searchUserId()
  }, []);

  const _searchUserId = async () => {
    try {
      let userId = await AsyncStorage.getItem('userId');
      setUserId(userId);
    } catch (e) {}
  };

  const _selectImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImageSource(source)
     
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  }

  const _sendInformation = () => {
    const data = {
      bankAccountId: bankAccountId,
      number: number,
      userId: userId
    }
  }

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
            <View style={{borderWidth: 4, width: 60, height: 60, borderColor: '#ebe678', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'telegram'}
                  type={'material-community'}
                  size={40}
                  color={'#ebe678'}
                />
              </View>

              <Button
                title="Envio"
                containerStyle={{width: 300}}
                buttonStyle={{borderRadius: 20, backgroundColor: '#0484a4'}}
              />
          </View>
          
          <View style={{flex: 6, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Picker
              selectedValue={account}
              style={{height: 50, width: 300, color: '#fff'}}
              onValueChange={(itemValue, itemIndex) =>
                setAccount(itemValue)
              }>

                {
                  cuentas.map((cuenta, index) => {
                    return(
                      <Picker.Item label={`${cuenta.name} - ${cuenta.number}`} value={cuenta.number} color={'#000'} key={index}/>
                    );
                  })
                }
              
              
            </Picker>
            <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Numero de Operacion:</Text>
              <TextInput
                style={{ height: 50, borderColor: '#0484a4', borderWidth: 3, borderRadius: 20, color: '#fff', paddingHorizontal: 10 }}
                onChangeText={number => setNumber(number)}
                keyboardType={'numeric'}
                
              />
            </View>

            {
              imageSource !== '' &&
              <Image source={imageSource} style={{height: 200, width: 200}} />
            }
            
            
          </View>

          <View style={{flex: 2, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10}}> 
            <Button
              title="Cargar imagen"
              containerStyle={{width: 200}}
              buttonStyle={{borderRadius: 10, backgroundColor: '#1fc85f'}}
              onPress={() => _selectImage()}
            />
          </View>
        </View>
      }
    </View>
  )
}
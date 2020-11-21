import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';

export const Aggregate = () => {
  return(
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#142444',}}>
      <View style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
        <Image
          style={{width: 80, height: 80}}
          source={require('./../../assets/images/logo.png')}
          resizeMode={'contain'}
        />
        
        <Icon
          name={'menu'}
          type={'material-community'}
          color={'#0484a4'}
          size={30}
        />
        
      </View>

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
            style={{ height: 50, borderColor: '#0484a4', borderWidth: 1, borderRadius: 20 }}
            placeholder={'#123456789'}
            placeholderTextColor={'#fff'}
            // onChangeText={text => onChangeText(text)}
            
          />
        </View>
        
        <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
          <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Nombre y Apellido:</Text>
          <TextInput
            style={{ height: 50, borderColor: '#0484a4', borderWidth: 1, borderRadius: 20 }}
            placeholder={'#123456789'}
            placeholderTextColor={'#fff'}
            // onChangeText={text => onChangeText(text)}
            
          />
        </View>

        <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
          <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Cedula de Identidad:</Text>
          <TextInput
            style={{ height: 50, borderColor: '#0484a4', borderWidth: 1, borderRadius: 20 }}
            placeholder={'#123456789'}
            placeholderTextColor={'#fff'}
            // onChangeText={text => onChangeText(text)}
            
          />
        </View>
      </View>

      <View style={{flex: 2, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 10}}> 
        <Button
          title="G U A R D A R"
          containerStyle={{width: 200}}
          buttonStyle={{borderRadius: 10, backgroundColor: '#1fc85f'}}
        />
      </View>
    </View>
  )
}
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';

export const Home = props => {
  return(
    <View style={{flex: 1, backgroundColor: '#142444', alignItems: 'center', justifyContent: 'center'}}>

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

        <TouchableOpacity>
          <View style={{borderWidth: 4, width: 80, height: 80, borderColor: '#0484a4', borderRadius: 50, justifyContent: 'center'}}>
            <Icon
              name={'file-document-edit-outline'}
              type={'material-community'}
              size={50}
              color={'#0484a4'}
            />
          </View>

          <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold', paddingTop: 5}}>Registrar</Text>
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
        />
      </View>
    </View>
  );
}
import React from 'react';
import {View, Image} from 'react-native';
import {Icon} from 'react-native-elements'

export const Header = props => {
  
  const {hideIcon, navigation} = props;
  return(
    <View style={{alignSelf: 'stretch', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, height: 80}}>
        <Image
          style={{width: 80, height: 80}}
          source={require('./../../assets/images/logo3.png')}
          resizeMode={'contain'}
        />
        
        {
          !hideIcon &&
          <Icon
            name={'home'}
            type={'material-community'}
            color={'#0484a4'}
            size={30}
            onPress={() => navigation.navigate('Home')}
          />
        }
        
      </View>
  );
}
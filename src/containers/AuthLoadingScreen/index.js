import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export const AuthLoadingScreen = props => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async  () => {
        try {
            let userId = await AsyncStorage.getItem('userId');
            if (userId) {
                setLoading(false);
                props.navigation.navigate('Home');
            } else {
                setLoading(false);
                props.navigation.navigate('Login');
            }
        } catch (e) {}
    };

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#142444'}}>
            {
                loading &&
                <Spinner isVisible={loading} size={50} type={'ChasingDots'} color={'#fff'}/>
            }
        </View>
    )
}

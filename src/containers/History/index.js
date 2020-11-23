import React, {useState, useEffect} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

import { Header } from './../../components/header';

export const History = props => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [showData, setShowData] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionDetail, setTransactionDetail] = useState('');
  const [detailBank, setDetailBank] = useState('');
  const width = Dimensions.get('window').width;
  const [showPaja, setShowPaja] = useState(false);

  useEffect(() => {
    _chargeHistory()
  }, []);

  // console.log('\x1b[1;34m', 'LOG: detailBank', detailBank);

  const _chargeHistory = async () => {
    let userId = await AsyncStorage.getItem('userId');

    const data ={
      userId: userId
    };

    axios({
      method: 'put',
      timeout: 10000,
      url: 'http://web.dev10.codecraftdev.com/api/v1/userActionByUserId',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
    })
        .then(response => {
          // console.log('responseee ', response.data);
          setHistory(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.log('error ', error);
          setLoading(false);
          Toast.show(`Error Vuelve a intentar`, Toast.LONG);
        })
  };

  // console.log('\x1b[1;34m', 'LOG: transactionDetail', transactionDetail);


  const _transactionDetail = (item) => {
    setLoading(true);
    let endPoint;

    if(item.action === 'Cuenta de banco creada' || item.action === 'Cuenta de banco asociada') {
      endPoint = 'bankAccountById';
    }else if(item.action === 'Transaccion enviada') {
      endPoint = 'transactionById';
    }else {
      return false;
    }

    const data = {
      _id: item.dataId
    };

    axios({
      method: 'put',
      timeout: 10000,
      url: 'http://web.dev10.codecraftdev.com/api/v1/' + endPoint,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
    })
        .then(response => {
          // console.log('responseee ', response.data);
          setTransactionDetail(response.data);
          _detailBank(response.data.bankAccountId);
          // setModalVisible(true);
          // setLoading(false);
        })
        .catch(error => {
          console.log('error ', error);
          setLoading(false);
          Toast.show(`Error Vuelve a intentar`, Toast.LONG);
        })
  };

  const renderItem = ({ item }) => {
    // console.log('\x1b[1;34m', 'LOG: item', item);
    return(
        <TouchableOpacity
            style={{padding: 5, borderWidth: 2, borderRadius: 20, borderColor: '#fff'}}
            onPress={() => _transactionDetail(item)}
        >
          <Text style={{color: '#fff'}}>Usuario: {item.userId}</Text>
          <Text style={{color: '#fff'}}>Realizo: {item.action}</Text>
        </TouchableOpacity>
    );
  };

  const renderSeparator = () => {
    return(
        <View style={{height: 10}}>

        </View>
    )
  };

  const _detailBank = (id) => {

    const data ={
      _id: id
    };

    axios({
      method: 'put',
      timeout: 10000,
      url: 'http://web.dev10.codecraftdev.com/api/v1/bankAccountById',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      },
    })
        .then(response => {
          // console.log('responseee ', response.data);
          setDetailBank(response.data);
          setModalVisible(true);
          setLoading(false);
        })
        .catch(error => {
          console.log('error ', error);
          setLoading(false);
          Toast.show(`Error Vuelve a intentar`, Toast.LONG);
        })
  };

  const _mostrarImagenGrande = (url) => {

  };

  //para consultar los detalles de la cuenta a quien se transfirio usar bankAccountId
  //bankAccountById

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
            <View style={{borderWidth: 4, width: 60, height: 60, borderColor: '#0484a4', borderRadius: 50, justifyContent: 'center'}}>
                <Icon
                  name={'file-document-edit-outline'}
                  type={'material-community'}
                  size={40}
                  color={'#0484a4'}
                />
              </View>

              <Button
                title="Registro"
                containerStyle={{width: 300}}
                buttonStyle={{borderRadius: 20, backgroundColor: '#0484a4'}}
              />
          </View>

          <View style={{alignSelf: 'stretch', paddingHorizontal: 10}}>
            <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold'}}>Movimientos Realizados</Text>
          </View>

          <View style={{flex: 6, alignSelf: 'stretch', alignItems: 'flex-start', justifyContent: 'space-around'}}>

            <TouchableOpacity
                style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}
                onPress={() => {
                  setShowData(!showData);
                  setShowPaja(false);
                }}
            >
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Hoy</Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}
                onPress={() => {
                  setShowData(!showData);
                  setShowPaja(false);
                }}
            >
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Esta Semana</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}
                onPress={() =>{
                  setShowPaja(!showPaja);
                  setShowData(false);
                }}
            >
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Semana Pasada</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{alignSelf: 'stretch', paddingHorizontal: 10, flexDirection: 'row'}}
                onPress={() =>{
                  setShowPaja(!showPaja);
                  setShowData(false);
                }}
            >
              <Icon
                name={'menu-right'}
                size={32}
                type={'material-community'}
                color={'#fff'}
              />
              <Text style={{color: '#fff',  paddingVertical: 5, fontWeight: 'bold', paddingLeft: 10}}>Mes pasado</Text>
            </TouchableOpacity>


          </View>

          {
            showPaja &&
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30}}>
                  <Text style={{fontSize:24, color: '#fff', fontWeight: 'bold'}}>No hay registros para la fecha seleccionada</Text>
                </View>
          }

          {
            showData &&
                <View style={{flex: 6, alignSelf: 'stretch', paddingHorizontal: 30}}>
                  <FlatList
                      data={history}
                      renderItem={renderItem}
                      keyExtractor={item => item._id}
                      ItemSeparatorComponent={renderSeparator}
                  />
                </View>
          }

          <Modal
              isVisible={modalVisible}
              onBackdropPress={() => setModalVisible(!modalVisible)}
              onBackButtonPress={() => setModalVisible(!modalVisible)}
              backdropOpacity={0.4}
              style={{alignItems: 'center', justifyContent: 'center'}}
          >

              {
                transactionDetail.image &&
                    <View style={{ backgroundColor: '#fff',flex: 1, width:'100%',
                      alignItems: 'center', justifyContent: 'center', borderRadius: 20,
                    }}>
                      <View style={{flex: 9, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={{uri: transactionDetail.image}}
                            style={{flex: 1, height: 450, width:  width - 50}}
                            resizeMode={'contain'}
                        />
                      </View>

                      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Numero de Cuenta del banco: {detailBank.number}</Text>
                        <Text>Nombre: {detailBank.fullName}</Text>
                        <Text>Numero de operacion: {transactionDetail.numberOperation}</Text>
                      </View>


                    </View>
              }

              {
                !transactionDetail.image &&
                    <View style={{ backgroundColor: '#fff', height: 300, width: 300,
                      alignItems: 'center', justifyContent: 'center', borderRadius: 20,
                    }}>
                      <Text>Numero de Cuenta del banco: {transactionDetail.number}</Text>
                      <Text>Nombre: {transactionDetail.fullName}</Text>
                    </View>
              }

          </Modal>
        </View>
      }
    </View>
  )
}

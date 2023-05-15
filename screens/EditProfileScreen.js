import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Ioniocons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import WavyHeader from "../components/WavyHeader";

import { useNavigation } from "@react-navigation/native";
import { config } from '../config';
import { COLORS, SIZES } from '../constants';
import { AuthContext } from '../context/AuthContext';
import imagen from '../assets/images/Hamburguesa.jpg';
import axios from 'axios';


const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState('');
  const [inputData, setInputData] = useState({
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombreMarca: '',
    telefonos: '',
    imgUrl: ''
  })
  const {userToken} = useContext(AuthContext)

  useEffect(() => {
    axios.get(config.apiUrl + '/api/usuario',{
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    }).then((response) => {
      const usuarioData = response.data[0]
      setInputData(usuarioData);
      setSelectedImage(usuarioData.imgUrl)
    }).catch(e => console.error(e))
  }, [])

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setSelectedImage('data:image/jpeg;base64,' + result.assets[0].base64);
      setInputData({...inputData, imgUrl: 'data:image/jpeg;base64,' + result.assets[0].base64})
    } else {
      alert('No seleccionaste ninguna imagen.');
    }
  };

    const handleSubmitData = () => {
        
      axios.put(config.apiUrl + '/api/usuario', inputData, {
        headers: {
          Authorization: 'Bearer ' + userToken,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          const responseData = response.data;
          console.log(responseData);
        })
        .catch(e => console.error(e));
      navigation.navigate('Profile')
    }

    
  console.log(selectedImage, inputData)
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={90}
          customTop={80}
          customBgColor={"#CE5959"}
          customWavePattern={"M0,32L18.5,48C36.9,64,74,96,111,90.7C147.7,85,185,43,222,64C258.5,85,295,171,332,224C369.2,277,406,299,443,288C480,277,517,235,554,192C590.8,149,628,107,665,96C701.5,85,738,107,775,133.3C812.3,160,849,192,886,192C923.1,192,960,160,997,133.3C1033.8,107,1071,85,1108,112C1144.6,139,1182,213,1218,229.3C1255.4,245,1292,203,1329,186.7C1366.2,171,1403,181,1422,186.7L1440,192L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Profile');
          }}>
            <Ioniocons name='arrow-back' size={25} color={'white'} />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
          >Editar Perfil</Text>
        </View>

          
        <View style={{ margin: 20, marginTop: 70 }}>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={pickImageAsync}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: inputData.imgUrl ? selectedImage : '',
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              {inputData.nombres + ' ' + inputData.apellidoPaterno  + ' ' + inputData.apellidoMaterno}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.primary} size={20} />
            
            <TextInput
              value={inputData?.nombres}
              onChangeText={(text) => {
                setInputData({
                  ...inputData,
                  nombres: text
                })
              }}
              placeholder="Nombre(s)"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.primary} size={20} />
            <TextInput
            value={inputData?.apellidoPaterno}
            onChangeText={(text) => {
              setInputData({
                ...inputData,
                apellidoPaterno: text
              })
            }}
              placeholder="Apellido Paterno"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={COLORS.primary} size={20} />
            <TextInput
            value={inputData?.apellidoMaterno}
            onChangeText={(text) => {
              setInputData({
                ...inputData,
                apellidoMaterno: text
              })
            }}
              placeholder="Apellido Materno"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
            />
          </View>

          <View style={styles.action}>
            <FontAwesome name="tag" color={COLORS.primary} size={20} />
            <TextInput
            value={inputData?.nombreMarca}
            onChangeText={(text) => {
              setInputData({
                ...inputData,
                nombreMarca: text
              })
            }}
              placeholder="Nombre de marca"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
            />
          </View>

          <View style={styles.action}>
            <Feather name="phone" color={COLORS.primary} size={20} />
            <TextInput
              placeholder="Numero de celular"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={inputData?.telefonos[0]}
              onChangeText={(text) => {
                setInputData({
                  ...inputData,
                  telefonos: text
                })
              }}
              style={[
                styles.textInput,
                {
                  color: 'black',
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.commandButton} onPress={handleSubmitData}>
        <Text style={styles.panelButtonTitle}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    margin: 10
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: '#05375a',
  },
});


export default EditProfileScreen;
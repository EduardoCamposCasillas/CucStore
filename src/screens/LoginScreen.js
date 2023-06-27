import React, { useContext, useState, useRef, useCallback } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions, useWindowDimensions, Alert, SafeAreaView } from 'react-native'
import { COLORS, SIZES } from '../constants'
import WavyHeader from './../components/WavyHeader'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from './../context/AuthContext'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTogglePasswordVisibility } from './../hooks/useTogglePasswordVisibility'

const Logo = require('./../../assets/images/CUCEATS_LOGO.png')

const LoginScreen = () => {
  // ref
  const bottomSheetRef = useRef(null)
  const [isOpen, setIsOpen] = useState(true)

  // variables
  const snapPoints = ['60%', '90%']

  const handleSnapPress = useCallback((index) => {
    bottomSheetRef.current?.snapToIndex(index)
    setIsOpen(true)
  }, [])

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility()
  const { height } = useWindowDimensions()
  const navigation = useNavigation()
  const { login } = useContext(AuthContext)
  const [showWrongMail, setShowWrongMail] = useState(false)
  const userDefaultLoginData = {
    correo: '',
    contraseña: ''
  }
  const [loginData, setLoginData] = useState(userDefaultLoginData)

  const validateEmail = (mail) => {
    const regex = /^([a-zA-Z0-9_.+-])+@(alumnos|academicos)\.udg\.mx$/
    return regex.test(mail)
  }
  const onLoginPress = () => {
    // validate login
    if (validateEmail(loginData.correo)) {
      login(loginData)
    } else {
      Alert.alert('Error en formato de correo', 'El correo debe tener un dominio valido "(alumnos/academicos).udg.mx"')
    }
  }

  const onRegisterPress = () => {
    navigation.navigate('Register')
  }

  const onForgotPasswordPress = () => {
    console.warn('onForgotPasswordPress')
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#f1f1f1' }]}>

        <View style={styles.container}>
          <WavyHeader
            customStyles={styles.svgCurve}
            customHeight={200}
            customTop={140}
            customBgColor={'#CE5959'}
            customWavePattern={'M0,32L18.5,48C36.9,64,74,96,111,90.7C147.7,85,185,43,222,64C258.5,85,295,171,332,224C369.2,277,406,299,443,288C480,277,517,235,554,192C590.8,149,628,107,665,96C701.5,85,738,107,775,133.3C812.3,160,849,192,886,192C923.1,192,960,160,997,133.3C1033.8,107,1071,85,1108,112C1144.6,139,1182,213,1218,229.3C1255.4,245,1292,203,1329,186.7C1366.2,171,1403,181,1422,186.7L1440,192L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z'}
          />
          <View style={styles.headerContainer}>
            <Image
              source={Logo}
              style={[styles.logo, { height: height * 0.2 }]}
              resizeMode="contain"
            />
          </View>
          <View style={styles.viewContainer}>
            <TextInput
              value={loginData.correo}
              placeholder="usuario@dominio.udg.mx"
              style={styles.textInput}
              onChangeText={(text) => {
                setLoginData({
                  ...loginData,
                  correo: text
                }
                )
              }
              }
            />
            <View style={styles.textInput}>
              <TextInput
                placeholder="password"
                value={loginData.contraseña}
                style={{ width: '90%' }}
                secureTextEntry={passwordVisibility}
                onChangeText={(text) => {
                  setLoginData({
                    ...loginData,
                    contraseña: text
                  }
                  )
                }
                }
              />
              <TouchableOpacity onPress={handlePasswordVisibility}>
                <MaterialCommunityIcons name={rightIcon} size={22} color={COLORS.tertiary} style={{ opacity: 0.5 }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={onForgotPasswordPress}
            >
              <Text style={styles.subText}>Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
              onPress={onLoginPress}
            >
              <Text style={styles.buttonText}>Iniciar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRegisterPress}
            >
              <Text style={styles.subText}>Crear Cuenta</Text>
            </TouchableOpacity>
            <Text style={{
              color: COLORS.gray,
              fontSize: SIZES.large,
              marginTop: 30
            }}>CucStore</Text>
            <TouchableOpacity onPress={() => handleSnapPress(0)}>
              <Text style={{
                color: COLORS.gray,
                fontSize: SIZES.medium,
                marginTop: 30
              }}>Creditos</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          onClose={() => setIsOpen(false)}
        >
          <BottomSheetView>
            <Text>Creditos:</Text>
          </BottomSheetView>
        </BottomSheet>

    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  viewContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFDD83'
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 24
  },
  buttonText: {
    fontSize: SIZES.medium,
    color: COLORS.white
  },
  logo: {
    marginBottom: 40,
    width: '70%',
    maxWidth: 300,
    height: 100
  }
})

export default LoginScreen

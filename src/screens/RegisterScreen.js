import React, { useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS, SIZES } from '../constants'
import WavyHeader from './../components/WavyHeader'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import Ioniocons from 'react-native-vector-icons/Ionicons'
import { config } from './../config'

const RegisterScreen = () => {
  const navigation = useNavigation()
  const [showPasswordSecurity, setShowPasswordSecurity] = useState(false)
  const userDefaultData = {
    nombreCompleto: '',
    correo: '',
    contraseña: '',
    segundaContraseña: ''
  }
  const [inputValue, setInputValue] = useState(userDefaultData)

  const handleRegister = (e) => {
    if (getPasswordStrength() === 'Invalido') {
      Alert.alert('¡Contraseña Invalida!', 'Ingrese una contraseña valida (minimo 8 digitos)')
    }
    if (validatePassword()) {
      const { segundaContraseña, ...postUserData } = inputValue
      axios.post(config.apiUrl + '/api/auth/register', postUserData)
        .then(response => {
          const responseStatus = response.status

          if (responseStatus === 201) {
            Alert.alert('¡Usuario registrado exitosamente!', 'Usuario registrado con exito, sera redirigido a la ventada de inicio de sesión')
            navigation.navigate('Login')
          }

          if (responseStatus === 401) {
            Alert.alert('¡Error en el formato de la información!', 'Verifique que la información proporcionada se encuentre en el campo correcto')
          }
        })
        .catch(error => {
          if (error.response.status === 409) {
            Alert.alert('¡Error de autenticación!', 'Este correo electronico ya se encuentra registrado')
          }
          if (error.response.status === 500) {
            Alert.alert('¡Error en el servidor¡!', 'Presentamos un error en el servidor porfavor intentelo mas tarde')
          }
        })
    } else {
      Alert.alert('!Contraseñas incorrectas¡', 'Las contraseñas deben coincidir')
    }
  }

  const getPasswordStrength = () => {
    const regexDebil = /^.{8,}$/
    const regexIntermedio = /^(?=.*\d).{8,}$/
    const regexFuerte = /^(?=.*\d)(?=.*[!@#$%^&*.]).{8,}$/

    if (inputValue.contraseña.match(regexFuerte)) {
      // setPasswordSecurityColor('green')
      return 'Fuerte'
    }

    if (inputValue.contraseña.match(regexIntermedio)) {
      // setPasswordSecurityColor('yellow')
      return 'Intermedio'
    }

    if (inputValue.contraseña.match(regexDebil)) {
      // setPasswordSecurityColor('red')
      return 'Debil'
    }
    // setPasswordSecurityColor(COLORS.gray)
    return 'Invalido'
  }

  const validatePassword = () => {
    return inputValue.contraseña === inputValue.segundaContraseña
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView >
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={90}
          customTop={80}
          customBgColor={'#CE5959'}
          customWavePattern={'M0,32L18.5,48C36.9,64,74,96,111,90.7C147.7,85,185,43,222,64C258.5,85,295,171,332,224C369.2,277,406,299,443,288C480,277,517,235,554,192C590.8,149,628,107,665,96C701.5,85,738,107,775,133.3C812.3,160,849,192,886,192C923.1,192,960,160,997,133.3C1033.8,107,1071,85,1108,112C1144.6,139,1182,213,1218,229.3C1255.4,245,1292,203,1329,186.7C1366.2,171,1403,181,1422,186.7L1440,192L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z'}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Login')
          }}>
            <Ioniocons name='arrow-back' size={25} color={'white'} />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
          >Crear Cuenta</Text>
        </View>
        <View style={styles.viewContainer}>
          <TextInput
            defaultValue={inputValue.nombreCompleto}
            placeholder="Nombre completo"
            style={styles.textInput}
            onChangeText={(text) => {
              setInputValue({
                ...inputValue,
                nombreCompleto: text
              })
            }}
          />
          <TextInput
            placeholder="Correo"
            style={styles.textInput}
            onChangeText={(text) => {
              setInputValue({
                ...inputValue,
                correo: text
              })
            }}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => {
              if (text) {
                setShowPasswordSecurity(true)
              } else {
                setShowPasswordSecurity(false)
              }

              setInputValue({
                ...inputValue,
                contraseña: text
              })
            }}
          />
         {showPasswordSecurity &&
          <View style={{ position: 'relative', width: '80%' }}>
          <Text style={{
            position: 'absolute',
            right: 0,
            color: getPasswordStrength() === 'Debil' ? '#990000' : getPasswordStrength() === 'Intermedio' ? '#CCCC00' : getPasswordStrength() === 'Fuerte' ? '#009900' : COLORS.gray,
            marginHorizontal: 5
          }}>{getPasswordStrength()}</Text>
        </View>
          }
          <TextInput
            secureTextEntry={true}
            placeholder="Confirmar Contraseña"
            style={styles.textInput}
            onChangeText={(text) => {
              setInputValue({
                ...inputValue,
                segundaContraseña: text
              })
            }}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister} >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>

          <Text style={{
            color: COLORS.gray,
            fontSize: SIZES.large,
            marginTop: 30
          }}>CucStore</Text>
        </View>
      </KeyboardAwareScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
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
    marginRight: 'auto'
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
    paddingStart: 15,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFDD83'
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10
  },
  buttonText: {
    fontSize: SIZES.medium,
    color: COLORS.white
  },
  logo: {
    marginBottom: 40,
    width: '80%',
    height: 100
  }
})

export default RegisterScreen

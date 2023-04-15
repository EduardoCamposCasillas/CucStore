import React from "react";

import { Text, View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES } from '../constants';

const Logo = require('../assets/images/CUCEATS_LOGO.png');


const LoginScreen = () => {

  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        placeholder="email@email.com"
        style={styles.textInput}
      />
      <TextInput
        placeholder="password"
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Text style={styles.subText}>Olvidaste tu contraseña?</Text>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
      <Text style={styles.subText}>Crear Cuenta</Text>
      <Text style={{
        color: COLORS.gray,
        fontSize: SIZES.large,
        marginTop: 30,
      }}>CucStore</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFEBB4',
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#B46060',
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
  },
  buttonText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  logo: {
    marginBottom: 40,
    width: '80%',
    height: '15%',
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default LoginScreen;
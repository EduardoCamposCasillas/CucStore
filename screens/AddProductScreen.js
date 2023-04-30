import React from 'react';

import { Text, View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS, SIZES } from '../constants';
import WavyHeader from "../components/WavyHeader";
import { useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import ImageViewer from '../components/ImageViewer';

import Ioniocons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { SelectList } from 'react-native-dropdown-select-list';

const PlaceholderImage = require('../assets/placeholder.jpg');

const AddProductScreen = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  //items de categorias
  const data = [
    { key: '1', value: 'dulce' },
    { key: '2', value: 'salado' },
    { key: '3', value: 'otro' },
  ];

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('No seleccionaste ninguna imagen.');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <WavyHeader
          customStyles={styles.svgCurve}
          customHeight={90}
          customTop={80}
          customBgColor={"#CE5959"}
          customWavePattern={"M0,32L18.5,48C36.9,64,74,96,111,90.7C147.7,85,185,43,222,64C258.5,85,295,171,332,224C369.2,277,406,299,443,288C480,277,517,235,554,192C590.8,149,628,107,665,96C701.5,85,738,107,775,133.3C812.3,160,849,192,886,192C923.1,192,960,160,997,133.3C1033.8,107,1071,85,1108,112C1144.6,139,1182,213,1218,229.3C1255.4,245,1292,203,1329,186.7C1366.2,171,1403,181,1422,186.7L1440,192L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('Seller');
          }}>
            <Ioniocons name='arrow-back' size={25} color={'white'} />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
          >Agregar Producto</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text style={styles.textStyle}>Nombre del Producto</Text>
          <TextInput
            style={styles.textInput}
          />
          <Text style={styles.textStyle}>Descripción del producto</Text>
          <TextInput
            multiline={true}
            numberOfLines={5}
            style={styles.textArea}

          />
          <Text style={styles.textStyle}>Precio</Text>
          <TextInput
            placeholder='00.00'
            style={styles.textInput}

          />
          <Text style={styles.textStyle}>Selecciona una categoria</Text>
          <View style={{ marginTop: 10 }}>
            <SelectList
              data={data}
              search={false}
              setSelected={setSelectedCategory}
              defaultOption={{ key: '1', value: 'dulce' }}
              arrowicon={<Ioniocons name="arrow-down" size={25} color={COLORS.white} />}
              inputStyles={{ color: COLORS.white, fontWeight: 'bold', fontSize: SIZES.medium }}
              boxStyles={{ borderRadius: 30, borderColor: COLORS.primary, backgroundColor: COLORS.primary }}
              dropdownTextStyles={{ color: COLORS.white, fontWeight: 'bold', fontSize: SIZES.medium }}
              dropdownStyles={{ backgroundColor: COLORS.primary, color: COLORS.white, borderColor: COLORS.primary }}
            />
          </View>

          <Text style={styles.textStyle}>Selecciona una Imagen</Text>
          <TouchableOpacity style={styles.btnIcon} onPress={pickImageAsync}>
            <Ioniocons name='camera' size={25} color={'white'} />
            <Ioniocons name='add' size={25} color={'white'} />
          </TouchableOpacity>
          <View style={styles.imageViewerContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          </View>

          <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Agregar Producto</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
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
  viewContainer: {
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFDD83',
  },
  textArea: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#FFDD83',
    height: 100,
    textAlignVertical: 'top',
  },
  textStyle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.gray,
    justifyContent: 'flex-start',
    textAlign: 'left'
  },
  subText: {
    color: COLORS.gray,
    fontSize: SIZES.small,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    marginTop: 20,
    marginBottom: 20,
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
    height: 100,
  },
  btnIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    height: 60,
    width: 80,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  imageViewerContainer: {
    flex: 1,
    width: '100%',
    height: 200,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  }
});

export default AddProductScreen;
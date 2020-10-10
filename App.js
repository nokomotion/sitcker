import { StatusBar } from 'expo-status-bar';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { Component,useState,useEffect,useRef } from 'react';
import {FontAwesome} from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from 'react-native';






export default function App() {
const camRef =useRef(null);
  const[type,setType] =useState(Camera.Constants.Type.back);
  const[hasPermission,setHaspermission]=useState(null);
  
  useEffect(()=>{
    (async()=>{
    
      const{status}=await Camera.requestPermissionsAsync();
    setHaspermission(status==='granted');
    })();
    
    },[]);
    
    if(hasPermission===null){
      return <View/>;
    }
    if(hasPermission===false){
      return <Text>Acceso denegado!</Text>;
    }
    
    async function tomarfoto(){

    }


  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{flex:0.7}}
        type={type}
        ref={camRef}
        >
       
        <View style={{flex:1,backgroundColor:'transparent',flexDireccion:'row'}}>
    
       <TouchableOpacity
      style={{
        position:'absolute',
        bottom:20,
        left:20,
      }}
      onPress={()=>{
        setType(
          type===Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
        );
      }}
      >
<Text style={{fontSize:20,marginBottom:13,color:'#FFF'}}>Tocar</Text>
      </TouchableOpacity>

</View>
      </Camera>
<TouchableOpacity style={styles.boton}>
<FontAwesome name="camera" size={23} color="#FFF"></FontAwesome>

</TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton:{
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#121212',
    margin:20,
    borderRadius:10,
    height:100,
  },

});

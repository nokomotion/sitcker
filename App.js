import { StatusBar } from 'expo-status-bar';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { Component,useState,useEffect,useRef} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity,Modal,Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';





export default function App() {
const camRef =useRef(null);
  const[type,setType] =useState(Camera.Constants.Type.back);
  const[hasPermission,setHaspermission]=useState(null);
  const[fotoCapturada,SetfotoCapturada] =useState(null);
  const[abrir,setAbrir] =useState(false);
  useEffect(()=>{
    (async()=>{
    
      const{status}=await Camera.requestPermissionsAsync();
    setHaspermission(status==='granted');
    })();

    (async()=>{
    
      const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL);
     // console.log(status);
      setHaspermission(status==='granted');
    })();
    
    },[]);
    
    if(hasPermission===null){
      return <View/>;
    }
    if(hasPermission===false){
      return <Text>Acceso denegado!</Text>;
    }
    
    async function savePicture()
    {
    const asset =await MediaLibrary.createAssetAsync(fotoCapturada)
  .then(()=>{
    alert("Foto grabada");
  }).catch(error=>{
    console.log("error",error);
  })
    }
    async function tomarfoto(){
      if(camRef){
        const data=await camRef.current.takePictureAsync();
       SetfotoCapturada(data.uri);
       setAbrir(true);
        console.log(fotoCapturada);
      }
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
<TouchableOpacity style={styles.boton} onPress={tomarfoto}>
<FontAwesome name="camera" size={23} color="#FFF" />

</TouchableOpacity>

{fotoCapturada &&
<Modal
  animationType="slide"
  transparent={false}
  visible={abrir}

  >

    <View style={{flex:1,justifyContent:'center',alignItems:'center',margin:20}}>
    
     <View style={{margin:10, flexDirection:'row'}}>
       
      <TouchableOpacity style={{margin:10}} onPress={()=> setAbrir(false)}>
        <FontAwesome name="window-close" size={50} color="#FF0000"/>
        </TouchableOpacity>
        <TouchableOpacity style={{margin:10}} onPress={()=> savePicture}>
        <FontAwesome name="upload" size={50} color="#121212"/>
        </TouchableOpacity>
       </View>
     

    <Image style={{width:"100%",height:450, borderRadius:20}}

    source={{uri:fotoCapturada}}
    
    />



    </View>
  </Modal>
  }
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
    height:50,
  },

});

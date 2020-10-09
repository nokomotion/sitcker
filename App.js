import { StatusBar } from 'expo-status-bar';
import {Camera} from 'expo-camera';
import * as Permissions from 'expo-permissions';
import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';


state={
hasCameraPermission: null,
type: Camera.Constants.type.back,

};

async ComponentDidMount(){
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  this.setState({ hasPermission: status === 'granted' });
}

export default function App() {
  return (
    <View style={styles.container}>
      
      <Text>Hola Nokomotion</Text>
     

      <StatusBar style="auto" />
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
});

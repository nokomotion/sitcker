import { StatusBar } from "expo-status-bar";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { Component, useState, useEffect, useRef } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import Imagenes from "./Imagenes";

export default function Detalle() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHaspermission] = useState(null);
  const [recording, setRecording] = useState(false);

  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [fotoCapturada, SetfotoCapturada] = useState(null);
  const [abrir, setAbrir] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHaspermission(status === "granted");
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      // console.log(status);
      setHaspermission(status === "granted");
    })();
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.AUDIO_RECORDING
      );
      setHaspermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acceso denegado!</Text>;
  }

  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(fotoCapturada)
      .then(() => {
        alert("Foto grabada");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  async function tomarfoto() {
    if (camRef) {
      const data = await camRef.current.takePictureAsync();
      SetfotoCapturada(data.uri);
      setAbrir(true);
      console.log(data);
    }
  }
  async function grabarVideo() {
    if (!recording) {
      setRecording(true);
      const options = { quality: "360p", maxDuration: 30 };
      let video = await camRef.current.recordAsync(options);
      SetfotoCapturada(video.uri);
      setAbrir(true);
      console.log(video.uri);

      /*NavigationPreloadManager.navigate('Video reporte', {
        videoUri: video,
        coordenadas: 'poner latitud y longitud...'
      });*/
    } else {
      setRecording(false);
      camRef.current.stopRecording();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={camRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDireccion: "row",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons
              style={{ marginTop: 30, marginRight: 40, color: "black" }}
              name="ios-reverse-camera"
              size={34}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 0.1, alignSelf: "flex-start", alignItems: "center" }}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.torch
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              );
            }}
          >
            <FontAwesome name="camera" size={23} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={styles.boton} onPress={tomarfoto}>
        <FontAwesome name="camera" size={23} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.grabar} onPress={grabarVideo}>
        <Ionicons
          style={{ marginBottom: 10, color: "#EF3340" }}
          name={recording ? "ios-square" : "ios-radio-button-on"}
          size={100}
        />
      </TouchableOpacity>

      {fotoCapturada && (
        <Modal animationType="slide" transparent={false} visible={abrir}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <View style={{ margin: 10, flexDirection: "row" }}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => setAbrir(false)}
              >
                <FontAwesome name="window-close" size={50} color="#FF0000" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => savePicture()}
              >
                <FontAwesome name="upload" size={50} color="#121212" />
              </TouchableOpacity>
            </View>
            <Video
              source={{ uri: fotoCapturada }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping
              useNativeControls
              style={{ width: "100%", height: "80%", flex: 1, zIndex: 1 }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    margin: 20,
    borderRadius: 10,
    height: 50,
  },
  grabar: {
    justifyContent: "center",
    alignItems: "center",
  },
});

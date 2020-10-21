import React, { useState, useEffect, useRef, Component } from 'react'
import { Text,
        Button,
        View,
        SafeAreaView,
		TouchableOpacity,
		Platform, 
		ActivityIndicator, 
		Modal, 
		TouchableHighlight, 
		StyleSheet
		} from 'react-native';
import { Camera} from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';


const ScreenA = () => {
    // Pedir al usuarios los permisos necesarios para poder acceder a la camara
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [cameraRef, setCameraRef] = useState(null);
	const [recording, setRecording] = useState(false);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [hasCPermission, setCHasPermission] = useState(false);
	const [hasMPermission, setMHasPermission] = useState(false);
	const [loaded, setLoaded] = useState(false);
	// const [location, setLocation] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);


	useEffect(() => {
    	(async () => {
      		const { status } = await Camera.requestPermissionsAsync();
      		setHasPermission(status === 'granted');
    	})();
	}, []);

	async function requestMultiPermissions() {
		const { status, expires, permissions } = await Permissions.askAsync(
		  Permissions.AUDIO_RECORDING,
		  Permissions.CAMERA,
		  //Permissions.LOCATION
		);
  
		if (status !== 'granted') {
		  alert('Hey! You have not enabled selected permissions');
		} else {
		  setCHasPermission(true);
		  setMHasPermission(true);
		}
	}
	requestMultiPermissions();

    // Mostrar en pantalla en caso de que no se hayan obtenido los permisos de la camara
	if (hasPermission === null) {
    	return <View />;
  	}
  
	if (hasPermission === false) {
    	return <Text>Favor de poner los permisos para utilizar la camara</Text>;
  	}

    return (
        <View style = {{ flex: 1}}>
			<Camera type={type} flashMode={flash} ref={(ref) => {
              setCameraRef(ref);
            }} style={{ flex: 1.1 }}>

				 {/* Modal Test */}
				<Modal animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
        		}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Sección de stickers...</Text>

							<TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#296e29" }}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}>
								<Text style={styles.textStyle}>Aplicar Sticker</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

				<View style= {{ flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end' }}>

					{/* Mostrar el menu donde se encuentran los botones e información */}
					<View style = {{
						backgroundColor: 'white',
						flex: 0.3,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 5
					}}>

						{/* Boton para voltear la camara */}
						<TouchableOpacity style = {{ flex: 0.1, alignSelf: 'flex-end' }} onPress = {() => {
							setType(
								type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
							);
						}}>
							<Ionicons style = {{ marginTop: 30, marginRight: 40, color: 'black' }} name = 'ios-reverse-camera' size = {34} color = 'black'/>
						</TouchableOpacity>

						
						{/* Boton para el flash */}
						<TouchableOpacity style = {{flex: 0.1, alignSelf: 'flex-start', alignItems: 'center' }} onPress = {() => {
							setFlash(
								flash === Camera.Constants.FlashMode.torch
								? Camera.Constants.FlashMode.torch
								: Camera.Constants.FlashMode.off
							);
						}}>
							<Ionicons style = {{marginTop: 30, marginLeft: 40, color: 'black'}} name = {flash ? 'ios-flash' : 'ios-flash-off'} size = {34} color='black'/>
						</TouchableOpacity>


						{/* Botón para grabar */}
						<TouchableOpacity onPress = {async () => {
							if(!recording) {
								setRecording(true);
								const options = {quality: '360p', maxDuration: 30};
								let video = await cameraRef.recordAsync(options);
								console.log(video.uri)
								/*NavigationPreloadManager.navigate('Video reporte', {
									videoUri: video,
									coordenadas: 'poner latitud y longitud...'
								});*/
							}else{
								setRecording(false);
								cameraRef.stopRecording();
							}

							// Open modal
							//setModalVisible(true);
						}}>
							<Ionicons style={{marginBottom: 10,color: '#EF3340',}}name={recording ? 'ios-square' : 'ios-radio-button-on'}size={100}/>
						</TouchableOpacity>

						<Text style = {{color: 'black'}}>
							<Ionicons style = {{color: 'black'}} name='ios-navigate' size={18} color='black'/>

							{/* {'  '} */}
						</Text>

						<Text style = {{marginTop: 10, fontSize: 14, color: 'black'}}>
							Explicanos en 30 segundos que sucede...
						</Text>

						<Text style = {{fontSize: 14, color: 'black'}}>
							Presiona el botón para grabar.
						</Text>
					</View>
				</View>
			</Camera>
		</View>
    );
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
	  	justifyContent: "center",
	  	alignItems: "center",
	  	marginTop: 22
	},
	modalView: {
		margin: 20,
	  	backgroundColor: "white",
	  	borderRadius: 20,
	  	padding: 35,
	  	alignItems: "center",
	  	shadowColor: "#000",
	  	shadowOffset: {
			width: 0,
			height: 2
	  	},
	  	shadowOpacity: 0.25,
	  	shadowRadius: 3.84,
	  	elevation: 5
	},
	textStyle: {
		color: "white",
	  	fontWeight: "bold",
		textAlign: "center",
		fontSize: 22
	},
	modalText: {
	  	marginBottom: 15,
	  	textAlign: "center"
	},
	openButton: {
		borderRadius: 5,
		padding: 10,
		elevation: 2
	}
});

export default ScreenA
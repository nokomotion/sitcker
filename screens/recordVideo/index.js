import { StatusBar } from "expo-status-bar";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { Component, useState, useEffect, useRef } from "react";
import {
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
	Image,
	TextInput,
	TouchableHighlight,
} from "react-native";
import { Video } from "expo-av";
import * as MediaLibrary from "expo-media-library";

import EditVideo from "../editVideo/";

export default function RecordReport({ navigation }) {
	const camRef = useRef(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [hasPermission, setHaspermission] = useState(null);
	const [recording, setRecording] = useState(false);
	const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
	const [videoCapturado, setVideoCapturado] = useState(null);
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

	// async function savePicture() {
	// 	const asset = await MediaLibrary.createAssetAsync(videoCapturado)
	// 		.then(() => {
	// 			alert("Foto grabada");
	// 		})
	// 		.catch((error) => {
	// 			console.log("error", error);
	// 		});
	// }
	// async function tomarfoto() {
	// 	if (camRef) {
	// 		const data = await camRef.current.takePictureAsync();
	// 		setVideoCapturado(data.uri);
	// 		setAbrir(true);
	// 		console.log(data);
	// 	}
	// }

	async function grabarVideo() {
		let video;

		if (!recording) {
			setRecording(true);
			const options = { quality: "360p", maxDuration: 30 };
			video = await camRef.current.recordAsync(options);
			setVideoCapturado(video.uri);
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
				></View>
			</Camera>

			{/* Menu con opciónes de cámara */}
			<View
				style={{
					backgroundColor: "white",
					flex: 0.3,
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{/* Voltear camara */}
				<TouchableOpacity
					style={{
						alignSelf: "flex-end",
						flex: 0.1,
						position: "absolute",
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
						style={{ marginRight: 40, paddingBottom: 10, color: "black" }}
						name="ios-reverse-camera"
						size={38}
						color="black"
					/>
				</TouchableOpacity>

				{/* Activar flash */}
				<TouchableOpacity
					style={{
						flex: 0.1,
						alignSelf: "flex-start",
						alignItems: "center",
						position: "absolute",
					}}
					onPress={() => {
						setFlash(
							flash === Camera.Constants.FlashMode.torch
								? Camera.Constants.FlashMode.torch
								: Camera.Constants.FlashMode.off
						);
					}}
				>
					<Ionicons
						style={{ marginLeft: 40, paddingBottom: 10, color: "black" }}
						name={flash ? "ios-flash" : "ios-flash-off"}
						size={34}
						color="black"
					/>
				</TouchableOpacity>

				{/* Botón para grabar */}
				<TouchableOpacity style={styles.grabar} onPress={grabarVideo}>
					<Ionicons
						style={{ marginBottom: 10, color: "#EF3340" }}
						name={recording ? "ios-square" : "ios-radio-button-on"}
						size={100}
					/>
				</TouchableOpacity>

				<Text style={{ color: "black" }}>
					<Ionicons
						style={{ color: "black" }}
						name="ios-navigate"
						size={18}
						color="black"
					/>

					{/* {' Geolocalización aquí... '} */}
				</Text>

				<Text style={{ marginTop: 10, fontSize: 14, color: "black" }}>
					Explicanos en 30 segundos que sucede...
				</Text>
			</View>

			{videoCapturado && (
				<Modal animationType="slide" transparent={true} visible={abrir}>
					<View style={{ flex: 1 }}>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text style={styles.modalText}>
									¿Seguro que quiere utilizar este video?
								</Text>

								{/* Botones para confirmar el video tomado */}
								<View style={styles.modalBotones}>
									<TouchableHighlight
										style={{ ...styles.cancelarVideoBtn }}
										onPress={() => {
											setAbrir(false);
										}}
									>
										<Text style={{ color: "black" }}>Cancelar</Text>
									</TouchableHighlight>

									<TouchableHighlight
										style={{ ...styles.aceptarVideoBtn }}
										onPress={() => {
											setAbrir(false);
											// Cambiar de pantalla y mandar la uri del video capturado después de aceptar
											navigation.navigate("EditVideo", { uriVideoCapturado: videoCapturado });

											/*NavigationPreloadManager.navigate('Video reporte', {
        									videoUri: video,
        									coordenadas: 'poner latitud y longitud...'
      										});*/
										}}
									>
										<Text style={{ color: "white" }}>Aceptar</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>
				</Modal>

				// <Modal animationType="slide" transparent={false} visible={abrir}>
				// 	<View style={{ flex: 1 }}>
				// 		<Video
				// 			source={{ uri: videoCapturado }}
				// 			rate={1.0}
				// 			volume={1.0}
				// 			isMuted={false}
				// 			resizeMode="cover"
				// 			shouldPlay={true}
				// 			isLooping
				// 			useNativeControls={false}
				// 			style={{ width: "100%", height: "100%", flex: 1 }}
				// 		/>

				// 		<View style={styles.accionesBotones}>
				// 			{/* Descargar video */}
				// 			<TouchableOpacity
				// 				style={{ margin: 10 }}
				// 				onPress={() => setAbrir(false)}
				// 			>
				// 				<Ionicons name="md-close-circle" size={50} color="#fff" />
				// 			</TouchableOpacity>

				// 			{/* Subir video y guardarlo en el dispositivo */}
				// 			<TouchableOpacity
				// 				style={{ margin: 10 }}
				// 				onPress={() => savePicture()}
				// 			>
				// 				<Ionicons name="md-send" size={50} color="#fff" />
				// 			</TouchableOpacity>

				// 			<TouchableOpacity style={{ margin: 10 }}>
				// 				<MaterialCommunityIcons name="sticker" size={50} color="#fff" />
				// 			</TouchableOpacity>
				// 		</View>
				// 	</View>
				// </Modal>
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
	fondoVisualizacon: {
		flex: 1,
	},
	accionesBotones: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		left: 0,
		bottom: 0,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	modalBotones: {
		alignContent: "flex-end",
	},
	aceptarVideoBtn: {
		backgroundColor: "#006600",
		borderRadius: 3,
		padding: 10,
		elevation: 2,
	},
	cancelarVideoBtn: {
		backgroundColor: "white",
		padding: 10,
	},
});

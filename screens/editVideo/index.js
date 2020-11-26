import React, { Component, useState } from "react";
import {
	Animated,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";
import {
	PanGestureHandler,
	ScrollView,
	State,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import {
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DragResizeBlock } from "react-native-drag-resize";

import { USE_NATIVE_DRIVER } from "../../config";

export class DraggableBox extends Component {
	constructor(props) {
		super(props);
		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);
		this._lastOffset = { x: 0, y: 0 };
		this._onGestureEvent = Animated.event(
			[
				{
					nativeEvent: {
						translationX: this._translateX,
						translationY: this._translateY,
					},
				},
			],
			{ useNativeDriver: USE_NATIVE_DRIVER }
		);
	}
	_onHandlerStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastOffset.x += event.nativeEvent.translationX;
			this._lastOffset.y += event.nativeEvent.translationY;
			this._translateX.setOffset(this._lastOffset.x);
			this._translateX.setValue(0);
			this._translateY.setOffset(this._lastOffset.y);
			this._translateY.setValue(0);
		}
	};
	render() {
		return (
			<PanGestureHandler
				{...this.props}
				onGestureEvent={this._onGestureEvent}
				onHandlerStateChange={this._onHandlerStateChange}
			>
				<Animated.Image
					style={[
						styles.box,
						{
							transform: [
								{ translateX: this._translateX },
								{ translateY: this._translateY },
							],
						},
						this.props.boxStyle,
					]}
					source={{
						uri:
							"https://www.polimex.mx/sitio2018/wp-content/uploads/2019/01/cfe-logo-color-polimex.png",
					}}
				/>
			</PanGestureHandler>
		);
	}
}

export default class EditVideo extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// const { setVideoCapturado } = this.props.route.params;
		// const [modalVisible, setModalVisible] = useState(false);

		return (
			<View style={{ flex: 1 }}>
				<DraggableBox />

				{/* <Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Hello World!</Text>

							<TouchableHighlight
								style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Text style={styles.textStyle}>Hide Modal</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal> */}

				<Video
					source={{ uri: "https://i.imgur.com/1WQ4gdK.mp4" }}
					rate={1.0}
					volume={1.0}
					isMuted={false}
					resizeMode="cover"
					shouldPlay={true}
					isLooping
					useNativeControls={false}
					style={{ width: "100%", height: "100%", flex: 1 }}
				/>

				<View style={styles.accionesBotones}>
					{/* Descargar video */}
					<TouchableOpacity
						style={{ margin: 10 }}
						onPress={() => setArir(false)}
					>
						<Ionicons name="md-close-circle" size={50} color="#fff" />
					</TouchableOpacity>

					{/* Subir video y guardarlo en el dispositivo */}
					<TouchableOpacity
						style={{ margin: 10 }}
						// onPress={() => savePicture()}
					>
						<Ionicons name="md-send" size={50} color="#fff" />
					</TouchableOpacity>

					<TouchableOpacity
						style={{ margin: 10 }}
						onPress={() => setModalVisible(true)}
					>
						<MaterialCommunityIcons name="sticker" size={50} color="#fff" />
					</TouchableOpacity>
				</View>
			</View>

			// <View style={styles.scrollView}>
			// 	<DraggableBox />

			// 	<Video
			// 		source={{ uri: setVideoCapturado.uri }}
			// 		rate={1.0}
			// 		volume={1.0}
			// 		isMuted={false}
			// 		resizeMode="cover"
			// 		shouldPlay={true}
			// 		isLooping
			// 		useNativeControls={false}
			// 		style={{ width: "100%", height: "100%", flex: 1 }}
			// 	/>
			// </View>
		);
	}
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
	box: {
		width: 250,
		height: 150,
		alignSelf: "center",
		margin: 10,
		zIndex: 200,
	},
});

import React, { Component, useState, PureComponent } from "react";
import {
	Animated,
	StyleSheet,
	View,
	Image,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	Modal,
	FlatList,
	Alert,
} from "react-native";
import { PanGestureHandler, ScrollView, State } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Video } from "expo-av";
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { USE_NATIVE_DRIVER } from "../../config";

import {
	DragResizeBlock,
	DragResizeContainer,
	AXIS_X,
	AXIS_Y,
	AXIS_ALL,
	CONNECTOR_TOP_LEFT,
	CONNECTOR_TOP_MIDDLE,
	CONNECTOR_TOP_RIGHT,
	CONNECTOR_MIDDLE_RIGHT,
	CONNECTOR_BOTTOM_RIGHT,
	CONNECTOR_BOTTOM_MIDDLE,
	CONNECTOR_BOTTOM_LEFT,
	CONNECTOR_MIDDLE_LEFT,
	CONNECTOR_CENTER,
} from "react-native-drag-resize";

// Class component to test draggable component
class Container extends PureComponent {
	render() {
		const { children, title, onInit } = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.title}>{title}</Text>

				<DragResizeContainer style={styles.canvas} onInit={onInit}>
					{children}
				</DragResizeContainer>
			</View>
		);
	}
}

const ON_RESIZE_START = 0;
const ON_RESIZE = 1;
const ON_RESIZE_END = 2;
const ON_DRAG_START = 3;
const ON_DRAG = 4;
const ON_DRAG_END = 5;

export default class EditVideo extends Component {
	constructor(props) {
		super(props);

		const defaultLimitation = {
			x: 0,
			y: 0,
			w: 0,
			h: 0,
		};

		this.state = {
			// Draggable test
			currentEvent: null,
			selectedBlock: null,
			limitation: { ...defaultLimitation },

			data: [
				{ id: 1, image: "https://lorempixel.com/400/200/nature/6/" },
				{ id: 2, image: "https://lorempixel.com/400/200/nature/5/" },
				{ id: 3, image: "https://lorempixel.com/400/200/nature/4/" },
				{ id: 4, image: "https://lorempixel.com/400/200/nature/6/" },
				{ id: 5, image: "https://lorempixel.com/400/200/sports/1/" },
				{ id: 6, image: "https://lorempixel.com/400/200/nature/8/" },
				{ id: 7, image: "https://lorempixel.com/400/200/nature/1/" },
				{ id: 8, image: "https://lorempixel.com/400/200/nature/3/" },
				{ id: 9, image: "https://lorempixel.com/400/200/nature/4/" },
				{ id: 10, image: "https://lorempixel.com/400/200/nature/5/" },
			],
		};
	}

	// Draggable
	callEventHandler(event, message) {
		if (this.state.currentEvent !== event) {
			this.setState(() => {
				this.state.currentEvent = event;
				return this.state;
			});
			ToastAndroid.show(message, ToastAndroid.SHORT);
		}
	}

	renderTwoItems = () => {
		const { selectedBlock, limitation5 } = this.state;

		const BLOCK_0 = 0;
		const BLOCK_1 = 1;

		return (
			<Container
				onInit={(limitation) => {
					this.setState(() => {
						this.state.limitation5 = limitation;
						return this.state;
					});
				}}
			>
				<DragResizeBlock
					x={0}
					y={0}
					w={80}
					h={80}
					limitation={limitation5}
					isDisabled={BLOCK_0 !== selectedBlock}
					onPress={() => {
						this.setState(() => {
							this.state.selectedBlock = BLOCK_0;
							return this.state;
						});
					}}
				>
					<View
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "red",
						}}
					/>
				</DragResizeBlock>

				<DragResizeBlock
					x={80}
					y={80}
					w={80}
					h={80}
					limitation={limitation5}
					isDisabled={BLOCK_1 !== selectedBlock}
					onPress={() => {
						this.setState(() => {
							this.state.selectedBlock = BLOCK_1;
							return this.state;
						});
					}}
				>
					<View
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "green",
						}}
					/>
				</DragResizeBlock>
			</Container>
		);
	};

	addSticker = () => {
		Alert.alert("Acción", "Acción de poner de sticker sobre video");
	};

	state = {
		modalVisible: false,
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	};

	render() {
		// const { setVideoCapturado } = this.props.route.params;
		const { modalVisible } = this.state;

		return (
			<View style={{ flex: 1 }}>
				{/* Draggable test */}
				{this.renderTwoItems()}

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						// Alert.alert("Modal has been closed!");
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Seleccione un Sticker a usar</Text>

							<FlatList
								style={styles.list}
								contentContainerStyle={styles.listContainer}
								data={this.state.data}
								horizontal={false}
								numColumns={2}
								renderItem={(post) => {
									const item = post.item;

									return (
										<View style={styles.card}>
											<TouchableOpacity
												onPress={() => {
													this.addSticker();
												}}
											>
												<Image style={styles.cardImage} source={{ uri: item.image }} />
											</TouchableOpacity>
										</View>
									);
								}}
							/>

							<TouchableHighlight
								style={{ ...styles.aceptarVideoBtn }}
								onPress={() => {
									this.setModalVisible(!modalVisible);
								}}
							>
								<Text>Aceptar</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>

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
						// onPress={() => setArir(false)}
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

					<TouchableOpacity style={{ margin: 10 }} onPress={() => this.setModalVisible(true)}>
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
		fontSize: 22,
	},
	modalBotones: {
		alignContent: "flex-end",
	},
	aceptarVideoBtn: {
		backgroundColor: "#4CAF50",
		borderRadius: 3,
		padding: 10,
		elevation: 2,
		color: "#fff",
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
	container: {
		flex: 1,
		marginTop: 20,
	},
	list: {
		paddingHorizontal: 5,
	},
	listContainer: {
		alignItems: "center",
	},
	card: {
		marginVertical: 8,
		flexBasis: "50%",
		marginHorizontal: 5,
	},
	cardImage: {
		flex: 1,
		height: 150,
		width: null,
	},
	canvas: {
		width: "100%",
		height: "100%",
		backgroundColor: "#D1D5DA",
		marginTop: 4,
	},
});

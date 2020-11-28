import React, { Component, useState } from "react";
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

export default class EditVideo extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
				{ id: 9, image: "https://lorempixel.com/400/200/nature/5/" },
			],
		};
	}

	addSticker = () => {
		Alert.alert("Sticker", "Sticker puesto...");
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
								keyExtractor={(item) => {
									return <View style={styles.separator} />;
								}}
								ItemSeparatorComponent={() => {
									return <View style={styles.separator} />;
								}}
								renderItem={(post) => {
									const item = post.item;

									return (
										<View style={styles.card}>
											<Image
												style={styles.cardImage}
												source={{ uri: item.image }}
											/>
											<View style={styles.cardFooter}>
												<View style={styles.socialBarContainer}>
													<View style={styles.socialBarSection}>
														<TouchableOpacity
															style={styles.socialBarButton}
															onPress={() => this.addSticker()}
														>
															<Image
																style={styles.icon}
																source={{
																	uri:
																		"https://png.icons8.com/flat_round/50/000000/share.png",
																}}
															/>
															<Text
																style={[styles.socialBarLabel, styles.share]}
															>
																Usar
															</Text>
														</TouchableOpacity>
													</View>
												</View>
											</View>
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

					<TouchableOpacity
						style={{ margin: 10 }}
						onPress={() => this.setModalVisible(true)}
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
		color: "white",
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
	separator: {
		marginTop: 10,
	},
	card: {
		marginVertical: 8,
		flexBasis: "50%",
		marginHorizontal: 5,
	},
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingTop: 12.5,
		paddingBottom: 25,
		paddingHorizontal: 16,
		borderBottomLeftRadius: 1,
		borderBottomRightRadius: 1,
	},
	cardImage: {
		flex: 1,
		height: 150,
		width: null,
	},
	share: {
		color: "#25b7d3",
	},
	icon: {
		width: 25,
		height: 25,
	},
	socialBarContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		flex: 1,
	},
	socialBarSection: {
		justifyContent: "center",
		flexDirection: "row",
		flex: 1,
	},
	socialBarlabel: {
		marginLeft: 8,
		alignSelf: "flex-end",
		justifyContent: "center",
	},
	socialBarButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

import React, { PureComponent } from "react";
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
	Image,
	FlatList,
	ActivityIndicator,
	Dimensions,
} from "react-native";
import { StackNavigator } from "react-navigation-stack";
import MapView, { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { ScrollView } from "react-native-gesture-handler";
import ReportInfo from "../reportInfo";

// export default function Home({ navigation }) {
export default class Home extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			items: [],
		};
	}

	componentDidMount() {
		this.getDataFromAPI();
	}

	getDataFromAPI = async () => {
		const endPoint = "https://jsonplaceholder.typicode.com/photos?_limit=12";
		const res = await fetch(endPoint);
		const data = await res.json();
		this.setState({ items: data });
	};

	_renderReport = ({ item, index }) => {
		let { cardText, card, cardImage } = styles;
		return (
			<TouchableOpacity style={card} onPress={() => this.props.navigation.navigate("ReportInfo")}>
				<Image
					style={cardImage}
					source={{
						uri: item.url,
					}}
				/>
				<Text style={cardText}>Reporte: {item.title}</Text>
			</TouchableOpacity>
		);
	};

	render() {
		let { container, loader, map } = styles;
		let { items } = this.state;

		if (items.length === 0) {
			<View style={loader}>
				<ActivityIndicator size="large" />
			</View>;
		}

		return (
			<ScrollView>
				<View>
					<MapView
						style={map}
						showUserLocation
						followUserLocation
						initialRegion={{
							latitude: 23.19832,
							longitude: -106.423208,
							latitudeDelta: 0.002,
							longitudeDelta: 0.001,
						}}
					>
						<Marker
							coordinate={{ latitude: 23.198212, longitude: -106.423884 }}
							title="Test Reporte"
							description="Descripción del reporte"
						/>
					</MapView>

					<FlatList
						style={container}
						data={items}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderReport}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
	},
	cardText: {
		fontSize: 16,
		padding: 10,
	},
	card: {
		backgroundColor: "white",
		marginBottom: 10,
		marginLeft: "2%",
		width: "96%",
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowOffset: {
			width: 3,
			height: 3,
		},
		borderRadius: 5,
	},
	cardImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	loader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		height: 400,
	},
});

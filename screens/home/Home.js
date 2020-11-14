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
} from "react-native";
import { createStackNavigator } from "react-navigation-stack";

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
			<TouchableOpacity
				style={card}
				onPress={() => this.props.navigation.navigate("RecordInfo")}
			>
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
		let { container, loader } = styles;
		let { items } = this.state;

		if (items.length === 0) {
			<View style={loader}>
				<ActivityIndicator size="large" />
			</View>;
		}

		return (
			<FlatList
				style={container}
				data={items}
				keyExtractor={(item, index) => index.toString()}
				renderItem={this._renderReport}
			/>
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
		shadowOpacity: 1,
		shadowOffset: {
			width: 3,
			height: 3,
		},
	},
	cardImage: {
		width: "100%",
		height: 200,
		resizeMode: "cover",
	},
	loader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

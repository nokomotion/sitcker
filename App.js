import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./navigation/Nav";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
	return (
		<NavigationContainer>
			<Nav />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

			return <IconComponent name = {iconName} size = {25} color = {tintColor}/>
		}	
	}),
	tabBarOptions:{
		activeTintColor: '#fff',
		activeBackgroundColor: '#000',

		keyboardHidesTabBar: false,
		tabStyle: {
			backgroundColor: '#000'
		},

		labelStyle: {
			fontSize: 12,
		}
	}
})

const App = createAppContainer(tabNavigator)
export default App
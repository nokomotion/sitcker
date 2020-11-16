import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Home from "../screens/home/Home";
import RecordReport from "../screens/recordVideo";
import Profile from "../screens/profile/Profile";
import Imagenes from "../screens/editVideo/draggable";

const Tab = createBottomTabNavigator();

export default function Nav() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor: "#9d0208",
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: "Explorar",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="explore" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name="RecordReport"
				component={RecordReport}
				options={{
					tabBarLabel: "Grabar",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="camera" size={24} color="black" />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: "Perfil",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" size={size} />
					),
				}}
			/>
			{/* <Tab.Screen
				name="Imagenes"
				component={Imagenes}
				options={{
					tabBarLabel: "Editar",
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="edit" size={24} color="black" />
					),
				}}
			/> */}
		</Tab.Navigator>
	);
}

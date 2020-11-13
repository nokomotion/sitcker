import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
				activeTintColor: "#e91e63",
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="RecordReport"
				component={RecordReport}
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="camera" size={24} color="black" />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Imagenes"
				component={Imagenes}
				options={{
					tabBarLabel: "Imagenes",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

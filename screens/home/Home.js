import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<Text></Text>
			<Button
				title="Nos vamos a RecordReport"
				onPress={() => navigation.navigate("RecordReport")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
		alignItems: "center",
		justifyContent: "center",
	},
});

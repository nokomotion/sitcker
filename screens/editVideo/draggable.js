import React, { Component } from "react";
import { Animated, StyleSheet, View, Image } from "react-native";
import {
	PanGestureHandler,
	ScrollView,
	State,
} from "react-native-gesture-handler";

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
						uri: "https://reactnative.dev/img/tiny_logo.png",
					}}
				/>
			</PanGestureHandler>
		);
	}
}

export default class Example extends Component {
	render() {
		return (
			<View style={styles.scrollView}>
				<DraggableBox />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	box: {
		width: 150,
		height: 150,
		alignSelf: "center",
		backgroundColor: "plum",
		margin: 10,
		zIndex: 200,
	},
});

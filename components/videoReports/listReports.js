import React from 'react'
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native'
import { Video } from 'expo-av'


const ReportsLists = ({ navigation }) => {
    return (
        <SafeAreaView>
			<View>
				<Video
                    source = {{ uri: 'https://i.imgur.com/j020nsG.mp4' }}
                    rate = {1.0}
                    volume = {1.0}
                    isMuted = {false}
                    resizeMode = 'cover'
                    shouldPlay
                    isLooping
                    style = {{ width: 320, height: 640 }}
                />
			</View>
        </SafeAreaView>
    )
}

export default ReportsLists
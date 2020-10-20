import React from 'react'
import {
    View, 
    StyleSheet,
    Text, 
    Button,
    SafeAreaView,
    Dimensions,
    ScrollView } from 'react-native'
import { Video } from 'expo-av'

const {width, height} = Dimensions.get('window');

const ReportsLists = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
				    <Video
                        source = {{ uri: 'https://i.imgur.com/j020nsG.mp4' }}
                        rate = {1.0}
                        volume = {1.0}
                        isMuted = {false}
                        resizeMode = 'cover'
                        shouldPlay = {false}
                        isLooping = {false}
                        useNativeControls
                        style = {styles.video}
                    />
			    </View>

                <View>
                    <Text>Reporte</Text>
                    <Text>Grabado en: locación</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    video: {
        width: width,
        height: height
    }
});

export default ReportsLists
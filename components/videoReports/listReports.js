import React from 'react'
import {
    View, 
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    Dimensions,
    ScrollView } from 'react-native'
import { Video } from 'expo-av'

// const {widthVideo, heightVideo} = Dimensions.get('window');
// Image.getSize('../.././assets/hack.png', (width, height) => {this.setState({width, height})});


const ReportsLists = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Image style = {styles.watermark} source = {{uri: 'https://www.hackathones.mx/img/supporters/3.png'}}/>

                    <Video
                        source={{ uri: 'https://i.imgur.com/j020nsG.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay
                        isLooping
                        useNativeControls
                        style={{ width: 420, height: 680, flex: 1, zIndex: 1 }}
                    />
			    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    watermark: {
        margin: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 50,
        zIndex: 100
    }
});

export default ReportsLists
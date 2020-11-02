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

const {widthVideo, heightVideo} = Dimensions.get('window');
// Image.getSize('../.././assets/hack.png', (width, height) => {this.setState({width, height})});


const ReportInfo = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Video
                        source={{ uri: 'https://i.imgur.com/j020nsG.mp4' }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={false}
                        isLooping
                        useNativeControls
                        style={{ width: 420, height: 680, flex: 1, zIndex: 1 }}
                    />

                    <Image style = {styles.stickerPos} source = {{uri: 'https://www.hackathones.mx/img/supporters/3.png'}}/>
			    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    stickerPos: {
        margin: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        width: 80,
        height: 80
    }
});

export default ReportInfo
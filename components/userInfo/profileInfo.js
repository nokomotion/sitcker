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

type Props = {
    behind: React.Component,
    front: React.Component,
    under: React.Component
}

const ProfileInfo = ({ navigation }) => {
    return (
        <SafeAreaView>
			<View style={styles.container}>
                <View style={styles.center}>
                    <Image style = {styles.watermark} source = {{uri: 'https://www.hackathones.mx/img/supporters/3.png'}}/>


                    <View style={styles.behind}>
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
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: 100,
        justifyContent: 'center',
    },
    center: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    behind: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
});

export default ProfileInfo
import React from 'react'
import {
    View, 
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    Dimensions,
    ScrollView } from 'react-native'

// const {widthVideo, heightVideo} = Dimensions.get('window');

const ProfileInfo = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textBig}>Profile information and account details...</Text>
			    </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    textBig: {
        fontSize: 22,
        textAlign: 'center'
    }
});

export default ProfileInfo
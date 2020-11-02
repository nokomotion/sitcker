import React, { useState, useEffect } from 'react'
import { Video } from 'expo-av'
import { FlatList, StyleSheet, SafeAreaView, Dimensions, ScrollView, SectionList, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { ListItem } from 'react-native-elements';

const response = [
    {
        id: '1',
        title: 'Reporte #1'
    },
    {
        id: '2',
        title: 'Reporte #2'
    },
    {
        id: '3',
        title: 'Reporte #3'
    },
    {
        id: '4',
        title: 'Reporte #4'
    },
    {
        id: '5',
        title: 'Reporte #5'
    },
    {
        id: '6',
        title: 'Reporte #6'
    },
    {
        id: '7',
        title: 'Reporte #7'
    },
    {
        id: '8',
        title: 'Reporte #8'
    },
]

const ReportsLists = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);
    
    let text = 'Waiting...';

    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location); 
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <MapView style={styles.map}
                        showUserLocation
                        followUserLocation
                        initialRegion={{
                            latitude: 23.196557,
                            longitude: -106.426483,
                            latitudeDelta: 0,
                            longitudeDelta: 0.005
                        }}
                    />

                    <FlatList 
                        data={ response }
                        keyExtractor={ item => item.id }
                        renderItem={({ item }) => {
                        return (
                            <ListItem chevron title={ item.title } />
                        )
                        }}
                    />
                    {/* <SectionList
                        sections={[
                            { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
                            { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                        ]}
                        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({ section }) => (
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                        )}
                        keyExtractor={(item, index) => index}
                    /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
    }
});

export default ReportsLists
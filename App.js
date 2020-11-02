import React from 'react'
import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import RecordReport from './components/recordVideo'
import ReportsList from './components/videoReports'
import ProfileInfo from './components/userInfo'

const tabNavigator = createBottomTabNavigator({
    'Camara': createStackNavigator({
		'Grabar Reporte': RecordReport
    }),
    'Explorar': createStackNavigator({
		'Explorar reportes': ReportsList
    }),
    'Perfil': createStackNavigator({
		'Información de la cuenta': ProfileInfo
    })
},
{
	defaultNavigationOptions: ({navigation}) =>({
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			const {routeName} = navigation.state
			let IconComponent = Ionicons
			let iconName
			if (routeName === 'Camara'){
				iconName = focused ? 'ios-camera' : 'ios-camera'
			}else if (routeName === 'Explorar'){
				iconName = focused ? 'md-compass' : 'md-compass'
			}else if(routeName === 'Perfil'){
				iconName = focused ? 'ios-person' : 'ios-person'
			}

			return <IconComponent name = {iconName} size = {25} color = {tintColor}/>
		}	
	}),
	tabBarOptions:{
		activeTintColor: '#fff',
		activeBackgroundColor: '#000',

		keyboardHidesTabBar: false,
		tabStyle: {
			backgroundColor: '#000'
		},

		labelStyle: {
			fontSize: 12,
		}
	}
})

const App = createAppContainer(tabNavigator)
export default App
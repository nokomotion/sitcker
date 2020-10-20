import React from 'react'
import {  createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import RecordReport from './components/recordVideo/recordReport'
import ReportsList from './components/videoReports/listReports'
import ProfileInfo from './components/userInfo/profileInfo'

import { Ionicons } from '@expo/vector-icons'


const tabNavigator = createBottomTabNavigator({
    'Camara': createStackNavigator({
        RecordReport: RecordReport
    }),
    'Reportes': createStackNavigator({
		ReportsList: ReportsList
    }),
    'Perfil': createStackNavigator({
		ProfileInfo: ProfileInfo
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
		}else if (routeName === 'Reportes'){
			iconName = focused ? 'md-warning' : 'md-warning'
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
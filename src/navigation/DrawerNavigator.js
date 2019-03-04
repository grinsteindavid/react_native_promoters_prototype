import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import UserService from '../services/UserService';
import DrawerContent from './DrawerContent';
import StackNavigator from './StackNavigator';

import Login from '../screens/Login';
import Events from '../screens/Events';
import Invitations from '../screens/Invitations';
import Customers from '../screens/Customers';

const WIDTH = Dimensions.get('window').width;

const drawerNavigator = createDrawerNavigator({
	Events: {
		screen: Events
	},
	Customers: {
		screen: Customers
	},
	Stack: {
		screen: StackNavigator,
		navigationOptions: {
         	drawerLabel: () => null
    	}
	}
},
{
	contentComponent: ({navigation}) => {
		return(
			<DrawerContent 
				navigation={navigation} 
				ref={drawerRef => {
			  		UserService.setDrawer(drawerRef);
				}}
			/>
		);
	},
	initialRouteName: "Stack",
	drawerLockMode: 'locked-closed',
	drawerWidth: WIDTH * 0.83,
	drawerPosition: 'left',
	drawerOpenRoute: 'openDrawer',
	drawercloseRoute: 'closeDrawer',
	drawerToggleRoute: 'toggleDrawer'
});

export default drawerNavigator;
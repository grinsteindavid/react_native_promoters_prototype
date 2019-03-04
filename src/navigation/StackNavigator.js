import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from '../screens/Login';
import Events from '../screens/Events';
import Invitations from '../screens/Invitations';
import Customers from '../screens/Customers';
import SendInvitation from '../screens/SendInvitation';
import SendCustomer from '../screens/SendCustomer';

const stackNavigator = createStackNavigator({
	Login: {
		screen: Login
	},
	Events: {
		screen: Events
	},
	Invitations: {
		screen: Invitations
	},
	Customers: {
		screen: Customers
	},
	SendInvitation: {
		screen: SendInvitation
	},
	SendCustomer: {
		screen: SendCustomer
	}
},
{
	initialRouteName: "Login"
});

export default stackNavigator;
import { AsyncStorage } from 'react-native';
import axios from 'axios';

let user;
let drawerRef;
const axiosInstance = axios.create({
	baseURL: 'http://textblasts.atnight.com/api/promo/',
	headers: {
		post: {
			fbid: 'test',
			'X-Authorization': 'test'
		}
	}
})

function setDrawer(ref) {
	drawerRef = ref;
};

function getDrawer(ref) {
	return drawerRef;
};

function setUser(data) {
};

function getUser() {
};

function removeUser() {
};

export default {
	setUser,
	getUser,
	removeUser,
	setDrawer,
	getDrawer,
	axiosInstance
};
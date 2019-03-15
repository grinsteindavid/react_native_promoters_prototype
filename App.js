/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Font } from 'expo';
import Sentry from 'sentry-expo';
import { Ionicons } from '@expo/vector-icons';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import NavigationService from './src/services/NavigationService';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false
    }

    alert('v4 app');
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true })
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    
    const MainNavigation = createAppContainer(DrawerNavigator);
    Sentry.enableInExpoDevelopment = true;
    Sentry.config('https://7c585fd3da8d4d9eb915be109d10c34c@sentry.io/1310829').install();

    return (
      <MainNavigation ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }} />
    );
  }
}

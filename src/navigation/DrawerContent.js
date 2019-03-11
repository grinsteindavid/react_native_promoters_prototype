import React from 'react';
import { AsyncStorage, StyleSheet, ScrollView, View, TouchableOpacity, ImageBackground} from 'react-native';
import { Container, Header, Content, List, ListItem, Item, Input, Card, CardItem, Left, Body, Right, Thumbnail, Text, Button, Icon } from 'native-base';
import { Image, Avatar } from 'react-native-elements';
import { DrawerItems, SafeAreaView, NavigationActions, StackActions } from 'react-navigation';
import UserService from '../services/UserService';

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  async reset(routeName) {
      try {
        if (routeName === 'Login') {
          await AsyncStorage.clear();
          this.setState({ user: {} });
        }

        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: routeName })]
          })
        );
      } catch (error) {
        
      }
    }

  render () {
    const currentRoute = this.props.navigation.state.routeName;
    const routes = [
      {title: 'Invitations', name: 'Events', icon: 'send', iconType: 'FontAwesome'},
      {title: 'Customers', name: 'Customers', icon: 'address-book', iconType: 'FontAwesome'},
      {title: 'Log out', name: 'Login', icon: 'sign-out', iconType: 'FontAwesome'}
    ];

    return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerContainer}>
            <ImageBackground
              source={{ uri: this.state.user.client && this.state.user.client.cover }}
              style={styles.headerImage}
              resizeMode="cover"
            >
              <Avatar
                rounded
                size="large"
                containerStyle={styles.headerAvatar}
                source={{
                  uri: this.state.user.promoter && `${this.state.user.promoter.avatar}?type=normal`
                }}
              />
              <Text style={styles.headerText}>
                {this.state.user.client && this.state.user.client.name.toUpperCase()}
              </Text>
              <Text style={styles.headerText}>
                {this.state.user.promoter && this.state.user.promoter.full_name}
              </Text>
            </ImageBackground>
          </View>
            {
              routes.map((route, index) => {
                return (
                  <TouchableOpacity key={index}>
                    <Item onPress={() => this.reset(route.name)} style={route.name === currentRoute ? styles.drawerItemActive : styles.drawerItem}>
                      <Icon name={route.icon} style={{ margin: 20, marginRight: 30, color: '#606060' }} type={route.iconType} />
                      <Text>{route.title}</Text>
                    </Item>
                  </TouchableOpacity> 
                )
              })
            }
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    height: 170,
    marginBottom: 10
  },
  header: {
    padding: 0,
    margin: 0
  },
  headerAvatar: {
    margin: 20,
    marginBottom: 10
  },
  headerImage: {
    width: '100%', 
    height: '100%', 
    padding: 0, 
    margin: 0
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  drawerItemActive: {
    color: 'blue',
    backgroundColor: 'grey',
    height: 45,
    borderBottomWidth: 0
  },
  drawerItem: {
    color: 'black',
    height: 45,
    borderBottomWidth: 0
  }
});

export default DrawerContent;
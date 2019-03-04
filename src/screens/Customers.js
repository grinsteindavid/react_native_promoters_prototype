import React from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import MenuButton from '../components/MenuButton';

export default class Customers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: []
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: `${navigation.state.routeName}`,
    headerRight: <MenuButton navigation={navigation}/>,
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: '#fff'
  });

  async componentWillMount() {
  }

  render() {
    return (
      <Container>       
        <Content padder>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});
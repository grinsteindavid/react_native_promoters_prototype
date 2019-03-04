import React from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';

export default class SendCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: []
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Send customer',
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
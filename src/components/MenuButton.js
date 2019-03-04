import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'native-base';

class MenuButton extends React.Component {
  
  render () {
    return (
      <Button transparent onPress={() => this.props.navigation.toggleDrawer()} style={{margin: 5}}>
        <Icon name="menu"/>
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default MenuButton;
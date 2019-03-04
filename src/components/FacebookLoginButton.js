import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text} from 'native-base';
import { Facebook } from 'expo';

export default class FacebookLoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  async login() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('1668467996513766', {
        permissions: ['public_profile'],
      });
      
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const facebookResponse = await response.json();

        this.props.onLoginFinished({
          token: token,
          id: facebookResponse.id,
          name: facebookResponse.name
        });
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <Button block style={styles.facebook} onPress={() => this.login()}>
        <Icon name="logo-facebook"/>
        <Text>Log In with Facebook</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  facebook: {
    
  }
});
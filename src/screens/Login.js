import React from 'react';
import { StyleSheet, View, Linking, Image, AsyncStorage } from 'react-native';
import { Root, Container, Toast, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Fab, Accordion, Card, CardItem} from 'native-base';
import FacebookLoginButton from '../components/FacebookLoginButton';
import NavigationService from '../services/NavigationService';
import UserService from '../services/UserService';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };

  }

  static navigationOptions = {
    header: null,
    drawerLabel: () => null
  };

  async componentWillMount() {
    try {
      console.log('Login screen -> componentWillMount');
      const userData = await AsyncStorage.getItem('@localStore:userData');

      if (userData) {

        UserService.axiosInstance.defaults.headers.post['fbid'] = JSON.parse(userData).user.facebook.id;
        UserService.axiosInstance.defaults.headers.post['X-Authorization'] = JSON.parse(userData).user.AppToken;
        UserService.getDrawer().setState({
          user: JSON.parse(userData).user
        });
        NavigationService.reset("Events");
      }
    } catch (error) {
      
    }
       
  }

  async componentDidMount() {
    try {
      console.log('Login screen -> componentDidMount');
    } catch (error) {
      
    }
  }

  async loginFinished(facebook) {
    try {
      const response = await UserService.axiosInstance.get('loginPromoter', {
        headers: {
          fbid: facebook.id
        }
      });

      UserService.axiosInstance.defaults.headers.post['fbid'] = facebook.id;
      UserService.axiosInstance.defaults.headers.post['X-Authorization'] = response.data.AppToken;
      UserService.getDrawer().setState({
        user: {
          ...response.data,
          facebook: facebook
        }
      });

      await AsyncStorage.setItem('@localStore:userData', JSON.stringify({
        user: {
          ...response.data,
          facebook: facebook
        }
      }));
      NavigationService.reset("Events");
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  render() {
    return (
      <Root>
        <Container>
          <View style={{ flex: 1, padding: 60 }}>
              <Image source={require('../../assets/img/atnight-logo.png')} resizeMode={'contain'} style={{width: '100%'}}/>
          </View>
          <Content padder contentContainerStyle={styles.content}>
            <FacebookLoginButton onLoginFinished={this.loginFinished}/>

            <Button block transparent onPress={ ()=>{ Linking.openURL('https://atnight.com/about/general')}}>
              <Text>Need help?</Text>
            </Button>
          </Content>
        </Container>
        </Root>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  }
});
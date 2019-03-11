import React from 'react';
import { Platform, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { Slider, CheckBox, Divider } from 'react-native-elements';
import { Root, Toast, Container, Header, Footer, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Form, Item, Picker, Input, Icon } from 'native-base';
import { TextInputMask } from 'react-native-masked-text';
import UserService from '../services/UserService';

export default class SendCustomer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      user: {
        phone_number: '',
        rating: 5,
        gender: null,
        charge: null
      }
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Invite',
    headerStyle: { backgroundColor: 'black', height: 80 },
    headerTintColor: '#fff'
  });

  async componentWillMount() {
    try {

    } catch (error) {

    }
  }

  async saveCustomer() {
    try {
      if (!this.state.user.phone_number.length) {
        Toast.show({
          text: 'Phone number required!',
          position: 'bottom',
          type: 'danger'
        });
        return;
      }

      if (this.state.user.gender == null) {
        Toast.show({
          text: 'Gender required!',
          position: 'bottom',
          type: 'danger'
        });
        return;
      }

      if (this.state.user.charge == null) {
        Toast.show({
          text: 'Charge option required!',
          position: 'bottom',
          type: 'danger'
        });
        return;
      }

      this.setState({ loading: true });

      await UserService.axiosInstance.post('saveCustomer', {
        ...this.state.user
      });

      Toast.show({
        text: 'Guest successfully created!',
        position: 'bottom',
        type: 'success',
        duration: 2000
      });

      this.setState({
        loading: false, user: {
          phone_number: '',
          rating: 5,
          gender: null,
          charge: null
        }
      });

      this.refs['phoneInput'].getElement().focus();
    } catch (error) {
      console.log(error);

      Toast.show({
        text: error.response.data,
        position: 'bottom',
        type: 'danger',
        duration: 3000
      });

      this.setState({ loading: false });
    }
  }

  ratingMinus() {
    if (this.state.user.rating > 1) {
      this.setState({
        user: { ...this.state.user, rating: this.state.user.rating - 1 }
      });
    }
  }

  ratingPlus() {
    if (this.state.user.rating < 10) {
      this.setState({
        user: { ...this.state.user, rating: this.state.user.rating + 1 }
      });
    }
  }

  renderGender() {
    return (
      <>
        <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
          <View style={{ flex: 1 }}>
            <Text>Gender</Text>
          </View>
          <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', flex: 2 }}>
            <Icon name="woman" style={{ color: "pink" }} />
            <CheckBox size={28} checked={this.state.user.gender === 'female'} onPress={() => {
              this.setState({
                user: { ...this.state.user, gender: 'female' }
              })
            }} />
          </View>
          <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', flex: 2 }}>
            <Icon name="man" style={{ color: "blue" }} />
            <CheckBox size={28} checked={this.state.user.gender === 'male'} onPress={() => {
              this.setState({
                user: { ...this.state.user, gender: 'male' }
              })
            }} />
          </View>
        </View>
        <Divider style={{ backgroundColor: 'gray' }} />
      </>
    )
  }

  renderCharge() {
    return (
      <>
        <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
          <View style={{ flex: 1 }}>
            <Text>Charge?</Text>
          </View>
          <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', flex: 2 }}>
            <Text style={{ color: 'green' }}>Yes</Text>
            <CheckBox size={28} checked={this.state.user.charge} onPress={() => {
              this.setState({
                user: { ...this.state.user, charge: true }
              })
            }} />
          </View>
          <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row', flex: 2 }}>
            <Text style={{ color: 'red' }}>No</Text>
            <CheckBox size={28} checked={this.state.user.charge == false} onPress={() => {
              this.setState({
                user: { ...this.state.user, charge: false }
              })
            }} />
          </View>
        </View>
        <Divider style={{ backgroundColor: 'gray' }} />
      </>
    )
  }

  renderRating() {
    return (
      <>
        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', padding: 30 }}>
          <View style={{ width: 60, height: 50 }}>
            <Button primary onPress={() => this.ratingMinus()}>
              <Icon name="minus-circle" type="FontAwesome" />
            </Button>
          </View>
          <View style={{ width: 120, height: 50 }}>
            <Button transparent>
              <Icon name="star" type="FontAwesome" />
              <Text style={{ fontSize: 30 }}>{this.state.user.rating}</Text>
            </Button>
          </View>
          <View style={{ width: 60, height: 50 }}>
            <Button primary onPress={() => this.ratingPlus()}>
              <Icon name="plus-circle" type="FontAwesome" />
            </Button>
          </View>
        </View>
        <Divider style={{ backgroundColor: 'gray' }} />
      </>
    )
  }

  render() {
    return (
      <Root>
        <Container>
          <Content padder>
            <Form>

              <View style={{ flex: 1, flexDirection: 'row', padding: 15 }}>
                <View style={{ flex: 1 }}>
                  <Icon name="phone-square" type="FontAwesome" />
                </View>
                <View style={{ flex: 4 }}>
                  <TextInputMask
                    ref='phoneInput'
                    autoFocus={true}
                    placeholder="Phone number"
                    style={{ fontSize: 28 }}
                    type={'cel-phone'}
                    maxLength={14}
                    options={{
                      withDDD: true,
                      dddMask: '(999) 999-9999'
                    }}
                    value={this.state.user.phone_number}
                    onChangeText={text => {
                      if (text.length <= 14) {
                        this.setState({
                          user: { ...this.state.user, phone_number: text }
                        })
                      }
                    }}
                  />
                </View>
              </View>
              <Divider style={{ backgroundColor: 'gray' }} />

              {this.renderGender()}
              {this.renderCharge()}
              {this.renderRating()}

            </Form>
          </Content>
          <Footer>
            <Button block onPress={() => { this.saveCustomer() }}>
              {this.state.loading ?
                <ActivityIndicator /> : <Icon name="send" />
              }
              <Text>Save Customer</Text>
            </Button>
          </Footer>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({

});
import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import { Avatar, Badge, Card } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Item, Input, Left, Body, Right, Thumbnail, Image, Text, Button, Icon } from 'native-base';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import { TextMask } from 'react-native-masked-text'
import UserService from '../services/UserService';
import MenuButton from '../components/MenuButton';


export default class Customers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      search: ''
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Customers',
    headerRight: <MenuButton navigation={navigation} />,
    headerStyle: { backgroundColor: 'black', height: 80 },
    headerTintColor: '#fff'
  });

  async componentWillMount() {
    try {
      this.fetchCustomers();
    } catch (error) {

    }
  }

  async fetchCustomers() {
    try {
      const customers = await UserService.axiosInstance.get(`/fetchCustomers`);
      this.setState({ customers: customers.data });
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  renderAvatar(customer) {
    if (customer.fbid) {
      return (
        <Avatar
          source={{
            uri: `https://graph.facebook.com/${customer.fbid}/picture?type=normal`
          }}
          size="medium"
        />
      );
    } else {
      return (
        <Avatar
          source={require('../../assets/img/blank-profile.png')}
          size="medium"
        />
      );
    }
  }

  customerComponent = (customer, index) => (
    <ListItem avatar key={index}>
      <Left>
        <View>
          {this.renderAvatar(customer)}

          <Badge
            status="warning"
            value={
              <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                <Text style={{ fontSize: 12, color: 'white', marginLeft: 2 }}>
                  {customer.rating}
                </Text>
                <Icon name="star" style={{ fontSize: 12, color: 'white', margin: 0 }} />
              </View>
            }
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          />
        </View>
      </Left>
      <Body>
        {customer.first_name.length ?
          <Text>{customer.first_name} {customer.last_name}</Text> : <Text>Unknown</Text>
        }
        <TextMask
          value={customer.phone_number}
          type={'cel-phone'}
          options={{
            dddMask: '(999) 999-9999'
          }}
        />
        <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
          {customer.charge == 1 &&
            <Icon name="money" type="FontAwesome" />
          }
          <Icon name={customer.gender == 'male' ? 'man' : 'woman'} style={[customer.gender == 'male' ? { color: 'blue' } : { color: 'pink' }, { margin: 4, padding: 4 }]} />
        </View>

      </Body>
      <Right>
        <Text note numberOfLines={1}>{moment(customer.created_at).format("ddd, MMM DD, YYYY")}</Text>
        <Text note numberOfLines={1}>{moment(customer.created_at).format("hh:mm A")}</Text>
      </Right>
    </ListItem>
  )

  renderCustomers() {
    if (this.state.search.length) {
      return (
        this.state.customers
          .filter((customer) => customer.phone_number === this.state.search)
          .map((customer, index) => {
            return this.customerComponent(customer, index)
          })
      )
    } else {
      return (
        this.state.customers.map((customer, index) => {
          return this.customerComponent(customer, index)
        })
      )
    }
  }

  countMale() {
    return this.state.customers.filter((customer) => customer.gender === "male").length
  }

  countFemale() {
    return this.state.customers.filter((customer) => customer.gender === "female").length
  }

  render() {

    return (
      <Container>
        <NavigationEvents
          onWillFocus={payload => this.fetchCustomers()}
        />

        <Header searchBar rounded style={styles.searchBar}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={text => {
              
            }}/>
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <Card image={require('../../assets/img/guestlist_bouncer.jpg')}>
            <Button block transparent>
              <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                <Button onPress={() => this.props.navigation.navigate('SendCustomer')}>
                  <Icon name="send" />
                </Button>                
                <Text>{this.state.customers.length}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="woman" />
                <Text>{this.countFemale()}</Text>
              </View>
              <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                <Icon name="man" />
                <Text>{this.countMale()}</Text>
              </View>
            </Button>  
          </Card>

          <ScrollView>
            <List>
              {this.renderCustomers()}
            </List>
          </ScrollView>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: 'black'
  }
});
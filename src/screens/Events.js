import React from 'react';
import { Avatar, Badge } from 'react-native-elements';
import { AsyncStorage, Platform, StyleSheet, View, Image} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import MenuButton from '../components/MenuButton';
import UserService from '../services/UserService';

export default class Events extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: `${navigation.state.routeName}`,
    headerRight: <MenuButton navigation={navigation}/>,
    headerStyle: { backgroundColor: 'black', height: 80 },
    headerTintColor: '#fff'
  });

  async componentWillMount() {
    try {
      const fbid = await AsyncStorage.getItem('@localStore:fbid');
      this.loadEvents();
      
    } catch (error) {
      
    }
  }

  async loadEvents() {
    try {
      const events = await UserService.axiosInstance.get('/listCampaigns');
      this.setState({events: events.data});
    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  renderAlert() {
    if (!this.state.events.length) {
      return (
        <Button full danger iconLeft>
          <Icon name="warning" type="FontAwesome" />
          <Text>Sorry, there are no campaigns available.</Text>
        </Button>
      );
    }
  }

  render() {
    return (
      <Container>
        <NavigationEvents
          onWillFocus={payload => this.loadEvents()}
        />
        { this.renderAlert() }      
        <Content padder>
          <List>
            {
              this.state.events.map((event, index) => {
                return (
                  <ListItem thumbnail key={index}>
                    <Left>
                      <View>
                        <Avatar
                          source={{
                            uri: event.flyer
                          }}
                          size="large"
                        />

                        <Badge
                          status="primary"
                          value={`${event.rsvp.length}/${event.rsvp_count}`}
                          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                        />
                      </View>
                    </Left>
                    <Body>
                      <Text>{event.title.toUpperCase()}</Text>
                      <Text note numberOfLines={1}>{moment(event.date).format("ddd, MMM DD, YYYY")}</Text>
                      <Text note numberOfLines={2}>{moment(moment().format('MMM DD, YYYY') + ' ' + event.start_time).format("hh:mm A")} to {moment(moment().format('MMM DD, YYYY') + ' ' + event.end_time).format("hh:mm A")}</Text>              
                    </Body>
                    <Right>
                      <Button transparent onPress={() => this.props.navigation.navigate('Invitations', {event: event})}>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                )
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  
});
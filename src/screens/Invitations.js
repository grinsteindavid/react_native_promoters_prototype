import React from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator} from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Item, Input, Card, CardItem, Left, Body, Right, Thumbnail, Image, Text, Button, Icon } from 'native-base';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import { TextMask } from 'react-native-masked-text'
import UserService from '../services/UserService';
import MenuButton from '../components/MenuButton';


export default class Invitations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.navigation.getParam('event')
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Invitations',
    headerRight: <MenuButton navigation={navigation}/>,
    headerStyle: { backgroundColor: 'black' },
    headerTintColor: '#fff'
  });

  async componentWillMount() {
    try {
      this.loadReport();
    } catch (error) {
      
    }
  }

  async loadReport() {
    try {
      const event = await UserService.axiosInstance.get(`/listReport/${this.state.event.id}`);
      this.setState({ event: event.data });

    } catch (error) {
      alert(JSON.stringify(error));
    }
  }

  renderRsvpAvatar(rsvp) {
    if (rsvp.fbid) {
      return(
        <Avatar
          source={{
            uri: `https://graph.facebook.com/${rsvp.fbid}/picture?type=normal`
          }}
          size="medium"
        />
      );
    } else {
      return(
        <Avatar
          source={require('../../assets/img/blank-profile.png')}
          size="medium"
        />
      );
    }
  }

  render() {

    return (
      <Container>
        <NavigationEvents
          onWillFocus={payload => this.loadReport()}
        />
        
        <Header searchBar rounded style={styles.searchBar}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Left>
                <Avatar
                  size="large"
                  source={{
                    uri: this.state.event.flyer
                  }}
                />
                <Body>
                  <Text>{this.state.event.title.toUpperCase()}</Text>
                  <Text note>{moment(this.state.event.date).format("ddd, MMM DD, YYYY")}</Text>
                  <Text note>{moment(moment().format('MMM DD, YYYY') + ' ' + this.state.event.start_time).format("hh:mm A")} to {moment(moment().format('MMM DD, YYYY') + ' ' + this.state.event.end_time).format("hh:mm A")}</Text> 
                </Body>
              </Left>
              <Right>
                <Button onPress={() => this.props.navigation.navigate('SendInvitation', {event: this.state.event})}>
                  <Icon name="send" />
                </Button>
              </Right>
            </CardItem>
            <CardItem>
              <Button block transparent>
                <View style={{flexWrap: 'wrap', alignItems: 'center', flexDirection:'row'}}>
                  <Icon name="send" />
                  <Text>{`${this.state.event.rsvp.length}/${this.state.event.rsvp_count}`}</Text>
                </View>
                <View style={{flexWrap: 'wrap', alignItems: 'center', flexDirection:'row'}}>
                  <Icon name="woman" />
                  <Text>({this.state.event.stats && this.state.event.stats.female_count})</Text>
                </View>
                <View style={{flexWrap: 'wrap', alignItems: 'center', flexDirection:'row'}}>
                  <Icon name="man" />
                  <Text>({this.state.event.stats && this.state.event.stats.male_count})</Text>
                </View>
              </Button>
            </CardItem>
          </Card>

          <ScrollView>
            <List>
              {
                this.state.event.rsvp.map((rsvp, index) => {
                  return (
                    <ListItem avatar key={index}>
                      <Left>
                        <View>
                          {this.renderRsvpAvatar(rsvp)}

                          <Badge
                            status="warning"
                            value={
                              <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: 'white', marginLeft: 2 }}>
                                  {rsvp.rating}
                                </Text>
                                <Icon name="star" style={{ fontSize: 12, color: 'white', margin: 0 }} />
                              </View>
                            }
                            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                          />
                        </View>
                      </Left>
                      <Body>
                        {rsvp.first_name.length ?
                          <Text>{rsvp.first_name} {rsvp.last_name}</Text> : <Text>Unknown</Text>
                        }
                        <TextMask
                          value={rsvp.phone}
                          type={'cel-phone'}
                          options={{
                            dddMask: '(999) 999-9999'
                          }}
                        />
                        <View style={{ flexWrap: 'wrap', alignItems: 'center', flexDirection: 'row' }}>
                          {rsvp.charge == 1 &&
                            <Icon name="money" type="FontAwesome" />
                          }
                          <Icon name={rsvp.gender == 'male' ? 'man' : 'woman'} style={[rsvp.gender == 'male' ? {color: 'blue'} : { color: 'pink' }, { margin: 4, padding: 4 }]} />
                        </View>
                        
                      </Body>
                      <Right>
                        <Text note numberOfLines={1}>{moment(rsvp.rsvp_on).format("ddd, MMM DD, YYYY")}</Text>
                        <Text note numberOfLines={1}>{moment(rsvp.rsvp_on).format("hh:mm A")}</Text>
                      </Right>
                    </ListItem>
                  )
                  
                })
              }
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
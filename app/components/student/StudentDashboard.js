import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, CardItem, H3, Text, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { logOut, getDashboard, selectSession } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';
import logo from '../../assets/classmatelogoicon.png';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
import DashHeader from '../shared/Header';

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      assignments: [],
    };
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    // console.log('above axios: ', this.props.state.user.id);
    // console.log('props state user: ', this.props.state.user);
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      this.props.dispatch(getDashboard(res.data));
      this.state.isLoaded = true;
      this.setState({ assignments: res.data.sessionInfo.assignments });
      console.log('\nSTATE.ASSIGNMENTS\n: ', this.state.assignments);
    })
      .catch((err) => {
        console.error(err);
      });
  }

  onLogout = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  render() {
    // console.log(this.props.state, 'this is props.state');
    // NOTE styles is acting up w button
    // const { height, width } = Dimensions.get('window');
    // const styles = StyleSheet.create({
    //   bigcontainer: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     justifyContent: 'flex-start',
    //   },
    //   container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //   },
    //   list: {
    //     borderRadius: 5,
    //     borderColor: '#0000ff',
    //     backgroundColor: '#0000ff',
    //     marginTop: 5,
    //     marginBottom: 5,
    //     marginLeft: 5,
    //     marginRight: 5,
    //   },
    //   newlist: {
    //     borderRadius: 5,
    //     borderColor: 'cornflowerblue',
    //     backgroundColor: 'cornflowerblue',
    //     marginTop: 5,
    //     marginBottom: 5,
    //     marginLeft: 5,
    //     marginRight: 5,
    //   },
    //   contentContainer: {
    //     flexGrow: 1,
    //     backgroundColor: '#fff',
    //     justifyContent: 'center',
    //   },
    // });
    // console.log('this.props.state: ', this.props.state);
    const { user } = this.props.state;

    return (
      <ImageBackground
        source={blackboard}
        style={{
          backgroundColor: '#000000',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container>
          <DashHeader
            navigation={this.props.navigation}
            className="Dashboard"
            back={false}
          />
          {/* <Header style={{ backgroundColor: blue, justifyContent: 'center' }}>
            <Left>
              <Button
                iconRight
                success
                onPress={() => this.props.navigation.navigate('CheckIn')}
              >
                <Text>Check In</Text>
                <Icon name="check" size={20} style={{ marginRight: 10 }} />
              </Button>
            </Left>
            <Body>
              <H3 style={{ color: yellow }} >Dashboard</H3>
            </Body>
            <Right>
              <Image source={logo} style={{ width: 30, height: 30 }} />
            </Right>
          </Header> */}

          <Content padder>
            <Text style={{ fontSize: 30, color: white, textAlign: 'center' }} > {user.First_name} {user.Last_name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 10, marginBottom: 5 }}>
              <Button
                block
                iconRight
                success
                // onPress={this.props.navigation.navigate('CheckIn')}
              >
                <Text>Check In</Text>
                <Icon name="check" size={20} style={{ marginRight: 10 }} />
              </Button>

              <Button
                block
                iconLeft
                danger
                // onPress={this.props.navigation.navigate('EmergencyContact')}
              >
                <Text>Contact</Text>
                <Icon name="account" size={20} style={{ marginRight: 10 }} />
              </Button>
            </View>
            <Card title="YOUR SCHEDULE TODAY" containerStyle={{ backgroundColor: white, borderColor: blue }} dividerStyle={{ backgroundColor: blue }} >
              <View style={{ alignItems: 'center' }}><Icon color={blue} name="calendar" size={25} /></View>
              <View style={{ padding: 5 }} />
              {this.props.state.dashboard.formattedCalendar && this.props.state.dashboard.formattedCalendar.length > 0 ? this.props.state.dashboard.formattedCalendar.map((event, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                  <Text style={{ width: '30%', textAlign: 'center' }}>{`${event.startTime.time.slice(0, -3)} - ${event.endTime.time.slice(0, -3)}`}</Text>
                  <Text style={{ width: '70%', textAlign: 'right' }}>{`${event.summary}`}</Text>
                </View>
                )) : <Spinner color={blue} />
              }
            </Card>
            <Card title="UPCOMING DUE DATES" containerStyle={{ backgroundColor: white, borderColor: blue }} dividerStyle={{ backgroundColor: blue }}>
              <View style={{ alignItems: 'center' }}><Icon color={blue} name="bell" size={25} /></View>
              <View style={{ padding: 5 }} />
              {this.state.assignments && this.state.assignments.length > 0 ? this.state.assignments.reverse().map((el, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                  <Text style={{ width: '70%' }}>{el.title}</Text>
                  <Text style={{ width: '30%' }}>{el.dueDate}</Text>
                </View>
              )) : <Spinner color={blue} />
              }
            </Card>
          </Content>
        </Container>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(StudentDashboard);

StudentDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem, H3, Text } from 'native-base';
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
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      this.props.dispatch(getDashboard(res.data));
      this.state.isLoaded = true;
      this.state.assignments = res.data.sessionInfo.assignments;
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
                transparent
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
              >
                <Icon name="menu" size={30} color={yellow} />
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
            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 40, marginBottom: 30 }}>
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
            {/* <Button
              onPress={this.props.navigation.navigate('CheckIn')}
              buttonStyle={[{ marginBottom: 5, marginTop: 60 }]}
              iconRight={{ name: 'done' }}
              backgroundColor="green"
              rounded
              title="CheckIn"
            /> */}
            {/* <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={this.navigateToScreen('EmergencyContact')}
              iconRight={{ name: 'done' }}
              backgroundColor="blue"
              rounded
              title="Emergency Contact"
            /> */}
            <Card>
              <CardItem header>
                <Icon color={blue} name="calendar" size={25} />
                <Text>  Your Schedule Today</Text>
              </CardItem>
              {
                this.props.state.dashboard.formattedCalendar && this.props.state.dashboard.formattedCalendar.length > 0 ? this.props.state.dashboard.formattedCalendar.map((event, index) => (
                  <CardItem key={index}>
                    <Text>
                      {`${event.startTime.time.slice(0, -3)} - ${event.endTime.time.slice(0, -3)}`}
                    </Text>
                    <Text>
                      {'\t\t\t\t\t\t\t\t\t\t'}
                    </Text>
                    <Text>
                      {`${event.summary}`}
                    </Text>
                  </CardItem>
                )) : null
              }
            </Card>
            <Card>
              <CardItem header>
                <Icon color={blue} name="bell" size={25} />
                <Text>  Upcoming Due Dates</Text>
              </CardItem>
              {this.state.assignments && this.state.assignments.length > 0 ? this.state.assignments.map((el, index) => (
                <CardItem key={index}>
                  <Text>{`${el.title} --  ${el.dueDate}`}</Text>
                </CardItem>
              )) : null
              }
            </Card>
          </Content>
        </Container>
      </ImageBackground>
      // <View style={styles.bigcontainer}>
      //   <Header
      //     leftComponent={{ icon: 'menu', color: '#fff' }}
      //     centerComponent={{ text: `Student ${user.First_name} Dashboard`, style: { color: '#fff' } }}
      //     rightComponent={{ icon: 'home', color: '#fff' }}
      //     outerContainerStyles={{ width: Dimensions.get('window').width }}
      //   />
      //   <ScrollView
      //     contentContainerStyle={styles.contentContainer}
      //     scrollEnabled
      //   >
      //     <View style={styles.container}>
      //       <Text h5>Your Class Schedule</Text>
      //       <Icon color="blue" name="calendar" size={30} />

      //       <Text h5>Upcoming Due Dates</Text>
      //       <Icon color="blue" name="bell" size={30} />

      //       <Button
      //         buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
      //         onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
      //         iconRight={{ name: 'done' }}
      //         backgroundColor="blue"
      //         rounded
      //         title="Class"
      //       />
      //     </View>
      //   </ScrollView>
      // </View>
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

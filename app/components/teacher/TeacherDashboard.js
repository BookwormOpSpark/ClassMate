import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
// import { Text, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, Text, Card, CardItem } from 'native-base';
import logo from '../../assets/classmatelogoicon.png';
import { logOut, getDashboard } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';
import DashHeader from '../shared/Header';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
import blackboard from '../../assets/blackboard.jpg';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      assignments: [],
      calendar: [],
    };
    this.LogOut = this.LogOut.bind(this);
  }
  componentWillMount() {
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    })
      .then((res) => {
        this.props.dispatch(getDashboard(res.data));
        this.state.isLoaded = true;
        this.setState({ assignments: res.data.sessionInfo.assignments });
        this.setState({ calendar: res.data.formattedCalendar });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  LogOut = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  render() {
    // console.log(this.props.state);
    // const { height, width } = Dimensions.get('window');
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'flex-start',
    //   },
    // });
    const teacher = this.props.state.user;
    // console.log(this.props.state.dashboard, 'this.props....assignments');


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
          <Content padder>
            <Text style={{ fontSize: 30, color: white, textAlign: 'center' }} > {teacher.First_name} {teacher.Last_name}</Text>
            <View style={{ paddingVertical: 10 }} />
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
      // <View style={styles.container}>
      //   <Header
      //     leftComponent={{ icon: 'menu', color: '#fff' }}
      //     centerComponent={{ text: `Teacher ${teacher.First_name} Dashboard`, style: { color: '#fff' } }}
      //     rightComponent={{ icon: 'home', color: '#fff' }}
      //     outerContainerStyles={{ width: Dimensions.get('window').width }}
      //   />
      //   <Text h5>Your Class Schedule</Text>
      //   <Icon color="blue" name="calendar" size={30} />

      //   <Text h5>Upcoming Due Dates</Text>
      //   <Icon color="blue" name="bell" size={30} />
      // </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(TeacherDashboard);

TeacherDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

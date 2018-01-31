import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, Image, ImageBackground } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, Text, CardItem, Spinner } from 'native-base';
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


export default connect(mapStateToProps)(TeacherDashboard);

TeacherDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions } from 'react-native';
// import { Text, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, Text, Card, CardItem } from 'native-base';
import { logOut, getDashboard } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';

class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
    this.LogOut = this.LogOut.bind(this);
  }
  componentWillMount() {
    // console.log('\n\n\nTEACHER DASHBOARD MOUNTING\n\n\n');
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    })
      .then((res) => {
        this.props.dispatch(getDashboard(res.data));
        this.state.isLoaded = true;
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
    // console.log(this.props.state.dashboard.formattedCalendar);
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
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="menu" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
            <Icon color="red" name="food-apple" size={30} />
          </Right>
        </Header>
        <Content padder>
          <Text style={{ fontSize: 30 }} > {teacher.First_name} {teacher.Last_name}</Text>
          <Card>
            <CardItem header>
              <Icon color="blue" name="calendar" size={25} />
              <Text>Your Schedule Today</Text>
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
              <Icon color="blue" name="bell" size={25} />
              <Text>  Upcoming Due Dates</Text>
            </CardItem>
            <CardItem>
              <Text>(hardcoded) Worksheet 1</Text>
            </CardItem>
            <CardItem>
              <Text>(hardcoded) ScienceProject</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>

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

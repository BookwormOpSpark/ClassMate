import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import { logOut, getDashboard } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';


class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Teacher dashboard', this.props.state);
    this.state = {};
    this.LogOut = this.LogOut.bind(this);
  }
  componentWillMount() {
    // console.log('\n\n\nTEACHER DASHBOARD MOUNTING\n\n\n')
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      this.props.dispatch(getDashboard(res.data));
      // console.log('\n\n\nTEACHER DASHBOARD DISPATCHED, here are the prop\n\n\n', this.props.state)
    });
  }
  LogOut = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    });
    const teacher = this.props.state.user;
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `Teacher ${teacher.First_name} Dashboard`, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ width: Dimensions.get('window').width }}
        />
        <Text h5>Your Class Schedule</Text>
        <Icon color="blue" name="calendar" size={30} />

        <Text h5>Upcoming Due Dates</Text>
        <Icon color="blue" name="bell" size={30} />
      </View>
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

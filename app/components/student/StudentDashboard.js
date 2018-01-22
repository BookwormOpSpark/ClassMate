import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut, getDashboard, selectSession } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';


class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    // console.log('student dashboard this.props.state');
    // console.log(this.props.state);
    this.state = {
      selectedSession: '',
    };
    this.onLogout = this.onLogout.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillMount() {
    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      this.props.dispatch(getDashboard(res.data));
    });
  }

  onLogout = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  onSelect = async (item) => {
    // console.log('item', item);
    await this.props.dispatch(selectSession(item));
    this.props.navigation.navigate('StudentClassNavigation');
  }

  render() {
    // NOTE styles is acting up w button
    const { height, width } = Dimensions.get('window');
    const styles = StyleSheet.create({
      bigcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      list: {
        borderRadius: 5,
        borderColor: '#0000ff',
        backgroundColor: '#0000ff',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      newlist: {
        borderRadius: 5,
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
    });
    const { user, dashboard } = this.props.state;
    const sessions = dashboard.sessionInfo ? dashboard.sessionInfo.sessions : [];

    return (
      <View style={styles.bigcontainer}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `Student ${user.First_name} Dashboard`, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ width: Dimensions.get('window').width }}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <View style={styles.container}>
            <Text h5>Your Class Schedule</Text>
            <Icon color="blue" name="calendar" size={30} />

            <Text h5>Upcoming Due Dates</Text>
            <Icon color="blue" name="bell" size={30} />

            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={() => this.props.navigation.navigate('JoinClass')}
              iconRight={{ name: 'done' }}
              backgroundColor="blue"
              rounded
              title="Join a Class"
            />
            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={this.onLogout}
              iconRight={{ name: 'enhanced-encryption' }}
              backgroundColor="firebrick"
              rounded
              title="Log Out"
            />
          </View>
        </ScrollView>
      </View>
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

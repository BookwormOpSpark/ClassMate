import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut, getDashboard, selectSession } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';


class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
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
      console.log(res.data);
      this.props.dispatch(getDashboard(res.data));
    });
  }

  onLogout = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  onSelect = async (item) => {
    console.log('item', item);
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
        justifyContent: 'flex-start',
      },
      list: {
        borderRadius: 5,
        borderColor: 'blue',
        backgroundColor: 'blue',
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
    const { user } = this.props.state;
    const newSessions = this.props.state.session;
    const prevSessions = this.props.state.dashboard.sessions;

    console.log('student dashboard this.props.state');
    console.log(this.props.state);

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
              onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
              iconRight={{ name: 'directions-run' }}
              backgroundColor="blue"
              rounded
              title="Go to Class Biology"
            />

            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={() => this.props.navigation.navigate('JoinClass')}
              iconRight={{ name: 'done' }}
              backgroundColor="green"
              rounded
              title="Join a Class"
            />
            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={this.onLogout}
              iconRight={{ name: 'enhanced-encryption' }}
              backgroundColor="red"
              rounded
              title="Log Out"
            />
          </View>

          <View style={{ flex: 1 }}>
            {(prevSessions && prevSessions.length > 0) ?
              <View style={{ flex: 1 }}>
                <List containerStyle={{ flex: 1 }}>
                  <Text>
                    Your Current Classes
                  </Text>
                  {prevSessions.map((item, id) => (
                    <ListItem
                      containerStyle={styles.list}
                      key={`bbbtn${id}`}
                      title={`${item.description}`}
                      leftIcon={{ name: 'book' }}
                      titleStyle={{ color: 'white' }}
                      onPress={() => this.onSelect(item)}
                    />
                  ))}
                </List>
              </View> : null}
          </View>

          <View style={{ flex: 1 }}>
            {newSessions.length === 0
            ? null
            : <View style={{ flex: 1 }}>
              <List containerStyle={{ flex: 1 }}>
                <Text>
                  Your Newly Added Classes
                </Text>
                {newSessions.map((item, id) => (
                  <ListItem
                    containerStyle={styles.list}
                    key={`bbbtn${id}`}
                    title={`${item.className}`}
                    leftIcon={{ name: 'book' }}
                    titleStyle={{ color: 'white' }}
                    onPress={() => this.onSelect(item)}
                  />
                ))}
              </List>
              </View>}
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

import PropTypes from 'prop-types';
import axios from 'axios';
import { Permissions, Notifications } from 'expo';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut, selectSession, getClassInfo } from '../../actions/actions';
import { SERVER_URI, ClassInfoRoute, SendFirstNotification } from '../../constant';
import { blue, white, yellow, orange, red, green } from '../../style/colors';

class StudentDrawer extends Component {
  constructor(props) {
    super(props);
    // console.log('Student DRAWER PROPS', this.props);
    this.state = {};
    this.LogOut = this.LogOut.bind(this);
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
  }

  onSelect = async (item) => {
    // console.log('item', item);
    this.props.navigation.navigate('DrawerClose');
    await this.props.dispatch(selectSession(item));
    // this.props.navigation.navigate('TeacherClassNavigation');
    const navigateAction = NavigationActions.navigate({
      routeName: 'StudentClassNavigation',
      action: NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'StudentClassDashboard' })],
      }),
    });
    this.props.navigation.dispatch(navigateAction);
    await axios.get(`${SERVER_URI}${ClassInfoRoute}`, {
      params: {
        sessionId: item.sessionID,
      },
    }).then((res) => {
      // console.log('classInfo studentDrawer', res.data);
      this.props.dispatch(getClassInfo(res.data));
    });
  }

  LogOut = async () => {
    await this.props.dispatch(logOut());
    // this.props.navigation.navigate('FirstPage');
    this.props.screenProps.rootNavigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    }));
  }

  registerForPushNotificationsAsync = async () => {
    const PUSH_ENDPOINT = `${SERVER_URI}${SendFirstNotification}`;
    const userID = this.props.state.user.id;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can
    // retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        userID,
      }),
    });
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      action: NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      }),
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { user, dashboard } = this.props.state;
    const prevSessions = dashboard.sessionInfo ? dashboard.sessionInfo.sessions : [];
    const styles = StyleSheet.create({
      container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: white,
      },
      navItemStyle: {
        padding: 10,
      },
      sectionHeadingStyle: {
        backgroundColor: yellow,
        paddingVertical: 10,
        paddingHorizontal: 5,
      },
      navSectionStyle: {
        paddingHorizontal: 15,
        backgroundColor: white,
      },
      addClassStyle: {
        backgroundColor: white,
        alignItems: 'center',
        padding: 10,

      },
      footerContainer: {
        padding: 10,
        backgroundColor: white,
      },

    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              {user.First_name} {user.Last_name}
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('StudentDashboardNavigation')}>
                Dashboard
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Classes
            </Text>
            {!!prevSessions && !!prevSessions.length &&
              <View style={styles.navSectionStyle}>
                {prevSessions.map((session, id) => (
                  <Text
                    style={styles.navItemStyle}
                    onPress={() => this.onSelect(session)}
                    key={id}
                  >
                    {session.sessionName}
                  </Text>
                ))}
              </View>
            }
            <View style={{ paddingVertical: 5 }} />
            <View style={styles.addClassStyle}>
              {/* <Button
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                onPress={this.navigateToScreen('JoinClass')}
                iconRight={{ name: 'add-circle-outline' }}
                backgroundColor={green}
                rounded
                title="Join a Class"
              /> */}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.registerForPushNotificationsAsync}
            iconRight={{ name: 'music-note' }}
            backgroundColor={blue}
            rounded
            title="Notifications"
          />
          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.LogOut}
            iconRight={{ name: 'exit-to-app' }}
            backgroundColor={red}
            rounded
            title="Log Out"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(StudentDrawer);

StudentDrawer.propTypes = {
  navigation: PropTypes.object,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

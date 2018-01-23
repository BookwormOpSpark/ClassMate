import PropTypes from 'prop-types';
import axios from 'axios';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut, selectSession, getClassInfo } from '../../actions/actions';
import { SERVER_URI, ClassInfoRoute } from '../../constant';

class StudentDrawer extends Component {
  constructor(props) {
    super(props);
    // console.log('Student DRAWER PROPS', this.props);
    this.state = {};
    this.LogOut = this.LogOut.bind(this);
  }

  onSelect = async (item) => {
    // console.log('item', item);
    await this.props.dispatch(selectSession(item));
    await axios.get(`${SERVER_URI}${ClassInfoRoute}`, {
      params: {
        sessionId: item.sessionID,
      },
    }).then((res) => {
      // console.log('classInfo', res.data);
      this.props.dispatch(getClassInfo(res.data));
    });
    this.props.navigation.navigate('StudentClassNavigation');
  }

  LogOut = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    const { user, dashboard } = this.props.state;
    const prevSessions = dashboard.sessionInfo ? dashboard.sessionInfo.sessions : [];
    const styles = StyleSheet.create({
      container: {
        paddingTop: 20,
        flex: 1,
      },
      navItemStyle: {
        padding: 10,
      },
      sectionHeadingStyle: {
        backgroundColor: 'lightgrey',
        paddingVertical: 10,
        paddingHorizontal: 5,
      },
      navSectionStyle: {
        paddingHorizontal: 15,
      },
      addClassStyle: {
        // backgroundColor: 'green',
        alignItems: 'center',
        padding: 10,

      },
      footerContainer: {
        padding: 10,
        // backgroundColor: 'red',
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
                    // onPress={this.navigateToScreen('StudentClassNavigation')}
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
              <Button
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                onPress={this.navigateToScreen('JoinClass')}
                iconRight={{ name: 'done' }}
                backgroundColor="blue"
                rounded
                title="Join a Class"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            onPress={this.navigateToScreen('CheckIn')}
            buttonStyle={[{ marginBottom: 5, marginTop: 60 }]}
            iconRight={{ name: 'done' }}
            backgroundColor="green"
            rounded
            title="CheckIn"
          />
          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.Logout}
            iconRight={{ name: 'enhanced-encryption' }}
            backgroundColor="firebrick"
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

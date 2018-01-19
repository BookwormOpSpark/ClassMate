import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';

class TeacherDrawer extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View>
            <Text>
              Teacher name
            </Text>
            <View>
              <Text onPress={this.navigateToScreen('Page1')}>
                Dashboard
              </Text>
            </View>
          </View>
          <View>
            <Text>
              Classes
            </Text>
            <View>
              <Text onPress={this.navigateToScreen('Page2')}>
                Class 1
              </Text>
              <Text onPress={this.navigateToScreen('Page3')}>
                Class 2
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text>fixed footer LOGOUT</Text>
        </View>
      </View>
    );
  }
}

TeacherDrawer.propTypes = {
  navigation: PropTypes.object,
};

export default TeacherDrawer;

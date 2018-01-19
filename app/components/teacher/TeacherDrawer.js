import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, ScrollView, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../../actions/actions';

class TeacherDrawer extends Component {
  constructor(props) {
    super(props);
    console.log('TEACHER DRAWER PROPS', this.props);
    this.state = {};
    this.LogOut = this.LogOut.bind(this);
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
    const styles = StyleSheet.create({
      container: {
        paddingTop: 20,
        flex: 1,
      },
      navItemStyle: {
        padding: 10,
      },
      navSectionStyle: {
        backgroundColor: 'lightgrey',
      },
      sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5,
      },
      footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey',
      },
    });
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Teacher name
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('TeacherDashboardNavigation')}>
                Dashboard
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Classes
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('TeacherClassNavigation')}>
                Class 1
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('TeacherClassNavigation')}>
                Class 2
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.LogOut}
            iconRight={{ name: 'enhanced-encryption' }}
            backgroundColor="red"
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


export default connect(mapStateToProps)(TeacherDrawer);

TeacherDrawer.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};


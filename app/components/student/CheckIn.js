import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { BarCodeScanner } from 'expo';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { selectSession } from '../../actions/actions';
import { blue, white, yellow, orange, red, green } from '../../style/colors';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastScannedUrl: null,
    };
  }

  _handleBarCodeRead = (result) => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      const sessions = this.props.state.dashboard.sessionInfo.sessions;
      let checkInSession = {};
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionID == result.data) {
          checkInSession = sessions[i];
        }
      }
      this.props.dispatch(selectSession(checkInSession));
      const navigateAction = NavigationActions.navigate({
        routeName: 'StudentClassNavigation',
        action: NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'StudentClassDashboard' })],
        }),
      });
      this.props.navigation.dispatch(navigateAction);
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text h1 style={{ color: '#ffffff', paddingBottom: 50 }}>Scan QR Code to Check In</Text>
        <BarCodeScanner
          onBarCodeRead={this._handleBarCodeRead}
          style={{
            height: 350,
            width: 350,
            marginBottom: 25,
          }}
        />
        <Button
          onPress={() => goBack()}
          title="Cancel"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(CheckIn);

CheckIn.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


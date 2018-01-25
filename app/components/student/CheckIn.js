import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Dimensions,
  LayoutAnimation,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Permissions, BarCodeScanner } from 'expo';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { selectSession } from '../../actions/actions';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      lastScannedUrl: null,
    };
  }

  componentWillMount() {
    // this._getLocationAsync();
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = (result) => {
    if (result.data !== this.state.lastScannedUrl) {
      LayoutAnimation.spring();
      const sessions = this.props.state.dashboard.sessionInfo.sessions;
      let checkInSession = {};
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionID === JSON.parse(result.data)) {
          checkInSession = sessions[i];
        }
      }
      this.props.dispatch(selectSession(checkInSession));
      const navigateAction = NavigationActions.navigate({
        routeName: 'TeacherClassNavigation',
        action: NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TeacherClassDashboard' })],
        }),
      });
      this.props.navigation.dispatch(navigateAction);
    }
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
  };

  _maybeRenderUrl = () => {
    if (!this.state.lastScannedUrl) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {`Checked-in to: ${this.state.lastScannedUrl}`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.cancelButtonText}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // _getLocationAsync = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     this.setState({
  //       errorMessage: 'Permission to access location was denied',
  //     });
  //   }

  // const location = await Location.getCurrentPositionAsync({});
  // this.setState({ location });
  // };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
        ? <Text>Requesting for camera permission</Text>
        : this.state.hasCameraPermission === false
        ? <Text style={{ color: '#fff' }}>
            Camera permission is not granted
          </Text>
          : <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
          />}
        {this._maybeRenderUrl()}
        <StatusBar hidden />
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
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(CheckIn);

CheckIn.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


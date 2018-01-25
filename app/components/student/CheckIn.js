import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Constants, Location, Permissions, BarCodeScanner } from 'expo';
import { Text } from 'react-native-elements';

export default class CheckIn extends Component {
  state = {
    location: null,
    errorMessage: null,
    hasCameraPermission: null,
    lastScannedUrl: null,
  };

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
      console.log('scanner result: ', result.data);
    }
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedUrl: null });
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

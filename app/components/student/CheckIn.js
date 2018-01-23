import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Text } from 'react-native-elements';

export default class CheckIn extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      const { longitude, latitude } = this.state.location.coords;
      const longitude1 = JSON.parse(longitude);
      const latitude1 = JSON.parse(latitude);
      if (longitude1 > -91 && longitude1 < -89 && latitude1 > 28 && latitude1 < 30) {
        text = 'You are checked in';
      }
    }

    const { longitude, latitude } = this.state.location ? this.state.location.coords : { longitude: '', latitude: '' };

    return (
      <View style={styles.container}>
        <Text h1 style={{ color: 'green' }}>Check In</Text>
        <Icon color="green" name="marker-check" size={30} />

        <Text style={styles.paragraph}>{this.state.location ? longitude : ''}</Text>
        <Text style={styles.paragraph}>{this.state.location ? latitude : ''}</Text>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
    color: 'green',
  },
});

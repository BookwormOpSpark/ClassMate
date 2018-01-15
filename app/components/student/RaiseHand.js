import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';

export default class RaiseHand extends React.Component {
  state = {
    accelerometerData: {},
    raisedHand: false,
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      this.setState({ accelerometerData });
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    const { x, y, z } = this.state.accelerometerData;

    return (
      <View style={styles.sensor}>
        <Text style={styles.blue}>Class Name</Text>
        <Text style={styles.blue}>Lift up your phone to be added to the queue!</Text>
        <Text>Accelerometer:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>
        <Text style={styles.red}>{y > 0.7 ? 'Added to the queue' : ''}</Text>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 50,
  },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
});

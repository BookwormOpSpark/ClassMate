import React from 'react';
import io from 'socket.io-client';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo';
import { Text } from 'react-native-elements';
import { SERVER_URI, QueueRoute} from '../../constant';


export default class RaiseHand extends React.Component {
  state = {
    accelerometerData: {},
    raisedHand: false,
  }

  componentDidMount() {
    this._toggle();

    const socket = io(SERVER_URI, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('ping', data => {
      this.setState(data);
    });
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
        <Text h3>Class Name</Text>
        <Text h4>Lift up your phone to be added to the queue!</Text>
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

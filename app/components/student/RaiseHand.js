import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { SERVER_URI, QueueRoute } from '../../constant';


class RaiseHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      accelerometerData: {},
    };

    this.socket = io('https://a4d36169.ngrok.io');
    this.getInQueue = this.getInQueue.bind(this);
  }

  componentDidMount() {
    this._subscribe();

    this.socket.on('connect', () => {
      // console.log('connected');
      this.setState({ isConnected: true });
    });

    this.socket.emit('raise-hand', {
      student: this.props.state.user.First_name,
      name: 'Lili',
    });
  }

  componentWillUpdate() {
    this.getInQueue();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getInQueue() {
    // console.log('hello');
    const { y } = this.state.accelerometerData;
    if (y > 0.7) {
      // console.log('winner');
      this.socket.emit('raise-hand', {
        student: this.props.state.user.First_name,
        time: Date.now(),
      });
    }
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
    const { y } = this.state.accelerometerData;
    const className = this.props.state.selectSession.description || this.props.state.selectSession.className;

    return (
      <View style={styles.sensor}>
        <Text h1>{className || 'Class'}</Text>
        <Text h4>Lift up your phone to be added to the queue!</Text>
        <Text>y: {round(y)} </Text>
        <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text>
        <Text style={styles.blue}>{y > 0.7 ? 'Your hand is raised' : ''}</Text>
        <Text>{y > 0.7 ? <Icon color="blue" name="hand-pointing-right" size={200} /> : ''}</Text>

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
    justifyContent: 'flex-start',
    alignItems: 'center',
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

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(RaiseHand);


RaiseHand.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

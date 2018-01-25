import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { SERVER_URI } from '../../constant';


class RaiseHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accelerometerData: {},
    };

    this.socket = io(SERVER_URI);
    this.getInQueue = this.getInQueue.bind(this);
    this.sendSocket = _.debounce(this.sendSocket.bind(this), 2000);
  }

  componentDidMount() {
    this._subscribe();
  }

  getInQueue() {
    const { y } = this.state.accelerometerData;
    if (y > 0.7) {
      this.sendSocket();
    }
  }

  sendSocket() {
    this.socket.emit('raise-hand', {
      student: this.props.state.user.First_name,
      time: Date.now(),
    });
  }

  _subscribe = () => {
    // When invoked, the listener is provided a single argumument that is an object containing keys x, y, z.
    this._subscription = Accelerometer.addListener((accelerometerData) => {
      this.setState({ accelerometerData });
      this.getInQueue();
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }


  render() {
    const { x, y, z } = this.state.accelerometerData;
    const className = this.props.state.selectSession.sessionName || this.props.state.selectSession.className;

    return (
      <View style={styles.sensor}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <View style={{ alignItems: 'center' }}>
            <Text h1 style={{ color: 'blue' }}>{`${className} Class` || 'Class'}</Text>
            <Text h6 style={{ color: 'blue' }}>Stand up your phone to be added to the queue!</Text>
            <Icon color="blue" name="paw" size={40} />
            <Text style={styles.blue}>{y > 0.7 ? 'Your hand is raised' : ''}</Text>
            <Text>{y > 0.7 ? <Icon color="blue" name="hand-pointing-right" size={200} /> : ''}</Text>
          </View>
        </ScrollView>
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
  sensor: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  blue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',

  },
  list: {
    borderRadius: 10,
    borderColor: 'cornflowerblue',
    backgroundColor: 'cornflowerblue',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
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

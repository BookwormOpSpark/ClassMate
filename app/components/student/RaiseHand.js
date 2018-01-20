import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import _ from 'lodash';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
import { List, ListItem, Text } from 'react-native-elements';
import { SERVER_URI, QueueRoute } from '../../constant';


class RaiseHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      now: '',
      accelerometerData: {},
      messages: [],
    };

    this.socket = io(SERVER_URI);
    this.getInQueue = this.getInQueue.bind(this);
  }

  componentDidMount() {
    this._subscribe();

    this.socket.on('connect', () => {
      this.setState({
        isConnected: true,
        now: Date.now(),
      });
    });

    this.socket.emit('raise-hand', {
      student: 'Lili',
    });

    this.socket.on('new-message', (data) => {
      this.setState({ messages: [...this.state.messages, data.message] });
      console.log(this.state.messages);
    });
  }

  componentWillUpdate() {
    this.getInQueue();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getInQueue() {
    const { y } = this.state.accelerometerData;
    if (y > 0.7) {
      console.log('winner');
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
    const { messages, now } = this.state;
    // filter the students by name
    const filterMsg = _.uniqBy(messages, 'student');

    return (
      <View style={styles.sensor}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <Text h1 style={{ color: 'blue' }}>{className || 'Class'}</Text>
          <Text h4 style={{ color: 'blue' }}>Lift up your phone to be added to the queue!</Text>
          <Text>y: {round(y)} </Text>
          <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text>
          <Text style={styles.blue}>{y > 0.7 ? 'Your hand is raised' : ''}</Text>
          <Text>{y > 0.7 ? <Icon color="blue" name="hand-pointing-right" size={200} /> : ''}</Text>

          <View style={{ flex: 1 }}>
            {(messages.length > 0) ?
              <View style={{ flex: 1 }}>
                <List containerStyle={{ flex: 1 }}>
                  {messages.map((item, id) => (
                    <ListItem
                      containerStyle={styles.list}
                      key={`bbbtn${id}`}
                      title={`${item.student}`}
                      subtitle={moment(this.state.now).from(moment(item.time))}
                      subtitleStyle={{ color: 'white' }}
                      leftIcon={{ name: 'star', color: 'white' }}
                      titleStyle={{ color: 'white' }}
                    />
              ))}
                </List>
              </View> : null}
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

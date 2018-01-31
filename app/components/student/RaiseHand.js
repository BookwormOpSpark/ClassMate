import React from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';
import { StyleSheet, View, ScrollView, ImageBackground, Image } from 'react-native';
import { Accelerometer } from 'expo';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { SERVER_URI } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';
import liftPhone from '../../assets/liftPhoneWhiteNoScreen.gif';
import DashHeader from '../shared/Header';

class RaiseHand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accelerometerData: {},
      handRaised: false,
    };

    this.socket = io(SERVER_URI);
    this.getInQueue = this.getInQueue.bind(this);
    this.sendSocket = _.debounce(this.sendSocket.bind(this), 2000);
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
    this.socket.close();
  }

  getInQueue() {
    const { y } = this.state.accelerometerData;
    if (y > 0.7) {
      this.state.handRaised = true;
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
    const styles = StyleSheet.create({
      sensor: {
        flex: 1,
        marginTop: 15,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
      },
      yellow: {
        color: '#f4d35e',
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 50,
      },
      contentContainer: {
        flexGrow: 1,
      },
    });
    const { y } = this.state.accelerometerData;
    const className = this.props.state.selectSession.sessionName || this.props.state.selectSession.className;

    return (
      <ImageBackground
        source={blackboard}
        style={{
          backgroundColor: '#000000',
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <DashHeader
          navigation={this.props.navigation}
          className={className}
          back
        />
        <View style={styles.sensor}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            scrollEnabled
          >
            <View style={{ alignItems: 'center' }}>
              <Text h6 style={{ color: '#f4d35e', fontSize: 20 }}>{`Lift your phone to raise your hand!`}</Text>
              <Text style={styles.yellow}>{this.state.handRaised ? 'Your hand is raised' : ''}</Text>
              <Text>{this.state.handRaised ? <Icon color="#f4d35e" name="human-greeting" size={200} /> : ''}</Text>
            </View>
          </ScrollView>
          <Image
            source={liftPhone}
            style={{
              width: 150,
              height: 150,
              marginBottom: 100,
              marginLeft: 120,
            }}
          />
        </View>
      </ImageBackground>

    );
  }
}


const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(RaiseHand);


RaiseHand.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

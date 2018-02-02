import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { Spinner } from 'native-base';
import { BarCodeScanner } from 'expo';
import { NavigationActions } from 'react-navigation';
import blackboard from '../../assets/blackboard.jpg';
import {blue, white, yellow, orange, red, green } from '../../style/colors';
import { SERVER_URI, JoinClassRoute, DashboardRoute } from '../../constant';
import DashHeader from '../shared/Header';
import { getDashboard, getSession, selectSession } from '../../actions/actions';

class JoinClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinCode: '',
      joined: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (barcode) => {
    const sessionId = parseInt(barcode.data, 10);
    const userId = this.props.state.user.id;
    this.setState({ joined: true });
    let id;
    
    await axios.post(`${SERVER_URI}${JoinClassRoute}`, { sessionId, userId })
      .then((res) => {
        const { sessionId, className, participantId } = res.data;
        id = sessionId;
        this.props.onJoiningClass({ sessionId, className, participantId });
      })
      .catch(err => console.error(err));

    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      this.props.onDashboard(res.data);
      const { sessions } = this.props.state.dashboard.sessionInfo;
      let sessionIndex = sessions.reduce((index, sesh, i) => {
        return sesh.sessionID === id ? i : index;
      }, sessions.length - 1);
      this.props.dispatch(selectSession(sessions[sessionIndex]));
      const navigateAction = NavigationActions.navigate({
        routeName: 'StudentClassNavigation',
        action: NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'StudentClassDashboard' })],
        }),
      });
      this.props.navigation.dispatch(navigateAction);
    });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        // had to comment out to make header work
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
      },
    });
    const student = this.props.state.user;
    const { session } = this.props.state;
    const index = session.length - 1;
    const { className } = session[index] ? session[index] : '';
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
          className="Join a class"
          back={false}
        />
        <View style={{ padding: 5 }} />
        <View style={styles.contentContainer}>
          <Text h2 style={{ color: white, marginBottom: 10 }}>{`Hello ${student.First_name} !`}</Text>
          <Text style={{ color: white, marginBottom: 10 }}>Scan a QR code from your teacher to join a class</Text>
          <BarCodeScanner
            onBarCodeRead={this.handleSubmit}
            style={{
              height: 350,
              width: 350,
            }}
          />
          {this.state.joined &&
            <Spinner color={white} />
          }
          {this.state.joined && className && 
            <Text h4 style={{ color: white }}>{`You are now enrolled in ${className} !`}</Text>
          }
          {this.state.joined && className &&
            <Icon color={green} name="thumb-up" size={20} />
          }
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(JoinClass);


JoinClass.propTypes = {
  state: PropTypes.object.isRequired,
  onJoiningClass: PropTypes.func.isRequired,
  onDashboard: PropTypes.func.isRequired,
};


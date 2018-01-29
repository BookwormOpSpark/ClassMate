import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import blackboard from '../../assets/blackboard.jpg';
import {blue, white, yellow, orange, red, green } from '../../style/colors';
import { SERVER_URI, JoinClassRoute, DashboardRoute } from '../../constant';

export default class JoinClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log('JoinClass');
    // console.log(this.props.state);
    this.state = { joinCode: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async () => {
    const { joinCode } = this.state;
    const userId = this.props.state.user.id;

    await axios.post(`${SERVER_URI}${JoinClassRoute}`, { joinCode, userId })
      .then((res) => {
        // console.log(res.data);
        const { sessionId, className, participantId } = res.data;
        this.props.onJoiningClass({ sessionId, className, participantId });
      })
      .catch(err => console.error(err));

    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      this.props.onDashboard(res.data);
    });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
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
        <View style={styles.contentContainer}>
          <Text h2 style={{ color: white }}>{`Hello ${student.First_name}!`}</Text>
          <FormLabel style={{ color: yellow }}>Enter the Join Code for the class</FormLabel>
          <Icon color={yellow} name="rocket" size={30} />
          <FormInput
            onChangeText={text => this.setState({ joinCode: text })}
          />
          <Button
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            onPress={this.handleSubmit}
            backgroundColor={blue}
            rounded
            title="Join!"
          />
          <Text h5>{className ? `You are now enrolled in ${className}` : ''}</Text>
          <Text>{className ? <Icon color="blue" name="thumb-up" size={20} /> : ''}</Text>

        </View>
      </ImageBackground>
    );
  }
}


JoinClass.propTypes = {
  state: PropTypes.object.isRequired,
  onJoiningClass: PropTypes.func.isRequired,
  onDashboard: PropTypes.func.isRequired,
};


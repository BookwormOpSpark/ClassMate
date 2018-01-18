import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { SERVER_URI, JoinClassRoute } from '../../constant';

export default class JoinClass extends React.Component {
  constructor(props) {
    super(props);
    console.log('JoinClass');
    console.log(props);
    this.state = { joinCode: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { joinCode } = this.state;
    const userId = this.props.state.user.id;
    // this.props.onJoiningClass({ joinCode });

    axios.post(`${SERVER_URI}${JoinClassRoute}`, { joinCode, userId })
      .then((res) => {
        console.log(res.data);
        const { sessionId, className, participantId } = res.data;
        this.props.onJoiningClass({ sessionId, className, participantId });
      })
      .catch(err => console.log(err));
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    const student = this.props.state.user;
    return (
      <View style={styles.container}>
        <Text h4>{`Hello ${student.First_name} ${student.Last_name}`}</Text>
        <FormLabel>Enter the Join Code for the class</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ joinCode: text })}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={this.handleSubmit}
          title="Join!"
        />
      </View>
    );
  }
}


JoinClass.propTypes = {
  state: PropTypes.object.isRequired,
  onJoiningClass: PropTypes.func.isRequired,
};


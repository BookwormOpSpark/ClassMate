import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { StyleSheet, View, TextInput } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { getSession } from '../../actions/actions';
import { SERVER_URI, JoinClassRoute } from '../../constant';

class JoinClass extends React.Component {
  constructor(props) {
    super(props);
    console.log('JoinClass');
    console.log(props);
    this.state = { text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { text } = this.state;
    console.log(text);
    this.props.dispatch(getSession({ text }));


    // need to post the class code and the student id => this.props.state.user.id
    // so that I get back a session id and a session name (biology...)
    // axios.post(`${SERVER_URI}${JoinClassRoute}`, { code })
    //   .then((res) => {
    //     console.log(res.data);
    //     const { sessionId, sessionName } = res.data;
    //     this.props.dispatch(getSession({ sessionId, sessionName }));
    //   })
    //   .catch(err => console.log(err));
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
    const student = this.props.user;
    return (
      <View style={styles.container}>
        <Text h4>{`Hello ${student.First_name} ${student.Last_name}`}</Text>
        <FormLabel>Enter the Join Code for the class</FormLabel>
        <TextInput
          style={{ height: 40 }}
          onChangeText={text => this.setState({ text })}
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


const mapStateToProps = state => ({
  user: state.user,
});
// Inject dispatch and user state
export default connect(mapStateToProps)(JoinClass);

JoinClass.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

//* ****mapDispatchToProps function 1**********
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(getSession, dispatch),
// });
//* ****mapDispatchToProps function 2**********
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ getSession }, dispatch);
// }

// JoinClass props
// Object {
// "dispatch": [Function dispatch],
// "navigation": Object {
// "dispatch": [Function anonymous],
// "goBack": [Function goBack],
// "navigate": [Function navigate],
// "setParams": [Function setParams],
// "state": Object {
// "key": "id-1516133317353-3",
// "params": undefined,
// "routeName": "JoinClass",
// },
// },
// "screenProps": undefined,
// "user": Object { },
// }

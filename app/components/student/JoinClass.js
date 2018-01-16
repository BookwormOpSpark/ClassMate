import React from 'react';
import axios from 'axios';
import { StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { getSession } from '../../actions/actions';
import { SERVER_URI, JoinClassRoute } from '../../constant';

class JoinClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { code } = this.state;
    console.log(code);
    this.props.dispatch(getSession({ code }));

    // need to post the class code and the student id => this.props.state.user.id
    // so that I get back a session id and a session name (biology...)
    // axios.post(`${SERVER_URI}/${JoinClassRoute}`, { code })
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
    const student = this.props.state.user;
    return (
      <View style={styles.container}>
        <Text h2>{`Hello ${student.First_name} ${student.Last_name}`}</Text>
        <FormLabel>Enter the Join Code for the class</FormLabel>
        <FormInput
          onChangeText={code => this.setState({ code })}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5, backgroundColor: 'blue' }]}
          onClick={this.handleSubmit}
          raised
          large
          title="Join!"
        />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  state,
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(getUser, dispatch),
});
JoinClass.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(JoinClass);

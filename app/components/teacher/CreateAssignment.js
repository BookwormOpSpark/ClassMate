import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SERVER_URI, CreateAssignments } from '../../constant';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
// import { Text } from 'react-native-elements';

class CreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      dueDate: '',
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = async () => {
    // console.log(this.props.state.selectSession.sessionID)
    const assignment = this.state;
    const sessionId = this.props.state.selectSession.sessionID;
    const info = { assignment, sessionId };
    await axios.post(`${SERVER_URI}${CreateAssignment}`, info)
      .then((res) => {
        // console.log(res.data);
        Alert.alert(
          'Success!',
          'Assignment has been created!',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      })
      .catch(err => console.error(err));
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        color: 'white',
        marginTop: 10,
        fontSize: 30,
      },
    });
    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: blue }}>
          <Text style={styles.headerText}>Create a New Assignment</Text>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label style={{ fontWeight: 'bold' }}>Title</Label>
              <Input onChangeText={text => this.setState({ title: text })} />
            </Item>
            <Item stackedLabel last>
              <Label style={{ fontWeight: 'bold' }}>Due Date - Please format MM/DD/YYYY</Label>
              <Input onChangeText={text => this.setState({ dueDate: text })} />
            </Item>
          </Form>
          <Button
            block
            style={{ backgroundColor: blue }}
            onPress={() => this.onSelect()}
          >
            <Text>Create Assignment</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(CreateAssignment);

CreateAssignment.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

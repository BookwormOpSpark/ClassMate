import React from 'react';
import { StyleSheet, Alert, ImageBackground } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Text } from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';
import { SERVER_URI, CreateAssignments } from '../../constant';
import { white, green } from '../../style/colors';
// import { Text } from 'react-native-elements';
import DashHeader from '../shared/Header';

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
    await axios.post(`${SERVER_URI}${CreateAssignments}`, info)
      .then((res) => {
        console.log('\nRES.DATA FROM ASSIGNMENT CREATION RETURN !!!!!!!!!!!!!\n', res.data);
        Alert.alert(
          'Success!',
          'Assignment has been created!',
          [
            { text: 'OK', onPress: () => this.props.navigation.goBack() },
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
        color: white,
        marginTop: 10,
        fontSize: 30,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
      },
    });
    const className = this.props.state.selectSession.sessionName;

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
        <Container style={styles.contentContainer}>
          <Header style={{ backgroundColor: 'transparent' }}>
            <Text style={styles.headerText}>Create a New Assignment</Text>
          </Header>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label style={{ fontWeight: 'bold', color: white }}>Title</Label>
                <Input style={{ color: white }} onChangeText={text => this.setState({ title: text })} />
              </Item>
              <Item stackedLabel last>
                <Label style={{ fontWeight: 'bold', color: white }}>Due Date - Please format MM/DD/YYYY</Label>
                <Input style={{ color: white }} onChangeText={text => this.setState({ dueDate: text })} />
              </Item>
            </Form>
            {!this.state.title || this.state.dueDate.length !== 10 ?
              <Button
                buttonStyle={[{ marginBottom: 5, marginTop: 10 }]}
                backgroundColor="grey"
                rounded
                title="Create Assignment"
              />
              :
              <Button
                buttonStyle={[{ marginBottom: 5, marginTop: 10 }]}
                onPress={() => this.onSelect()}
                backgroundColor={green}
                rounded
                title="Create Assignment"
              />
            }
          </Content>
        </Container>
      </ImageBackground>
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

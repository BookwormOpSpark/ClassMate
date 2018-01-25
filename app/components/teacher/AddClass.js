import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Button, Text, FormLabel, FormInput } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Spinner } from 'native-base';
import { getDashboard, getSession, selectSession } from '../../actions/actions';
import { SERVER_URI, AddClassRoute, DashboardRoute } from '../../constant';

class AddClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log('AddClass');
    // console.log(this.props.state);
    this.state = {
      joinCode: '',
      description: '',
      added: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async () => {
    const { joinCode, description } = this.state;
    // console.log(this.state);
    this.setState({ added: true });
    const userId = this.props.state.user.id;

    await axios.post(`${SERVER_URI}${AddClassRoute}`, { description, joinCode, userId })
      .then((res) => {
        // console.log(res.data);
        const { description, id, participantId } = res.data;
        const classId = res.data.id;
        this.props.dispatch(getSession({ description, classId, participantId }));
      })
      .catch(err => console.error(err));

    axios.get(`${SERVER_URI}${DashboardRoute}`, {
      params: {
        userId: this.props.state.user.id,
      },
    }).then((res) => {
      // console.log(res.data);
      this.props.dispatch(getDashboard(res.data));
      const { sessions } = this.props.state.dashboard.sessionInfo;
      this.props.dispatch(selectSession(sessions[sessions.length - 1]));
      const navigateAction = NavigationActions.navigate({
        routeName: 'TeacherClassNavigation',
        action: NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'TeacherClassDashboard' })],
        }),
      });
      this.props.navigation.dispatch(navigateAction);
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
    });
    const teacher = this.props.state.user;
    const { session } = this.props.state;
    const index = session.length - 1;
    const { description } = session[index] ? session[index] : '';
    return (
      <View style={styles.container}>
        <Text h2>{`Teacher ${teacher.First_name}`}</Text>
        <Text h4>Create a New Class!</Text>
        <Icon color="blue" name="rocket" size={30} />
        <FormLabel>Enter the Join Code for the class</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ joinCode: text })}
        />
        <FormLabel>Enter the class description</FormLabel>
        <FormInput
          onChangeText={text => this.setState({ description: text })}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={this.handleSubmit}
          backgroundColor="blue"
          rounded
          title="Create Class!"
        />
        <Text h5>{this.state.added ? `You just created a ${this.state.description} class!` : ''}</Text>
        <Text>{this.state.added ? <Icon color="blue" name="thumb-up" size={20} /> : ''}</Text>
        <View>{this.state.added ? <Spinner color="blue" /> : null}</View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(AddClass);

AddClass.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


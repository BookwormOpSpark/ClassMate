import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';

class TeacherClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.state);
    this.state = { text: '' };
  }

  // componentDidMount() {
  //   console.log('\n\n\nHELLLLOOOOOOO FROM TEACHER CLASS VIEW !!!!\n\n\n\nHERE IS THIS.PROPS.STATE\n', this.props.state);
  // }

  render() {
    const className = this.props.state.selectSession.sessionName;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <Text h1>{className || 'Class'}</Text>
        <Icon color="blue" name="rocket" size={30} />
        <Button
          onPress={() => this.props.navigation.navigate('Assignment')}
          buttonStyle={[{ marginBottom: 5, marginTop: 30 }]}
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          title="Assignment"
        />
        <Button
          onPress={() => this.props.navigation.navigate('Queue')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'thumb-up' }}
          backgroundColor="blue"
          rounded
          title="Queue"
        />
        <Button
          onPress={() => this.props.navigation.navigate('GiveAQuizz')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'assignment' }}
          backgroundColor="blue"
          rounded
          title="Give A Quizz"
        />
        <Button
          onPress={() => this.props.navigation.navigate('ClassRoster')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'assignment' }}
          backgroundColor="blue"
          rounded
          title="Class Roster"
        />
        <Button
          onPress={() => this.props.navigation.navigate('TeacherClassSchedule')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'schedule' }}
          backgroundColor="blue"
          rounded
          title="Daily Schedule"
        />
        <Button
          onPress={() => this.props.navigation.navigate('FunPost')}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          iconRight={{ name: 'schedule' }}
          backgroundColor="blue"
          rounded
          title="Student Engaged!"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(TeacherClassDashboard);

TeacherClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

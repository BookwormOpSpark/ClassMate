import React from 'react';
import axios from 'axios';
import { StyleSheet, View, ImageBackground, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { SERVER_URI, SendBadges, SendBadgeNotification } from '../../constant';

class BadgeTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentSelected: '' };
    this.postBadge = this.postBadge.bind(this);
  }

  postBadge = async () => {
    const { students } = this.props.state.classInfo;
    const className = this.props.state.selectSession.sessionName;
    const teacherName = `${this.props.state.user.First_name} ${this.props.state.user.Last_name}`;
    const studentName = this.state.studentSelected;
    const student = this.state.studentSelected.split(' ');
    const studentArr = students.filter(item => item.nameFirst === student[0] && item.nameLast === student[1]);
    const studentId = studentArr[0].participantId;
    const userId = studentArr[0].id;

    await axios.post(`${SERVER_URI}${SendBadges}`, { badgeId: 2, studentId })
      // .then(res => console.log(res))
      .catch(err => console.error(err));
    await axios.post(`${SERVER_URI}${SendBadgeNotification}`, { className, userId, studentName, teacherName })
      // .then(res => console.log(res))
      .catch(err => console.error(err));
    alert(`Badge send to student ${studentName}`);
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      text: {
        color: 'gold',
        textAlign: 'center',
      },
    });
    const className = this.props.state.selectSession.sessionName;
    const { students } = this.props.state.classInfo;
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
        <View style={styles.container}>
          <Icon
            color="gold"
            name="trophy"
            size={100}
            style={styles.icon}
          />
          <Text h3 style={styles.text}>Good Timing Badge</Text>
          <Picker
            itemStyle={{ color: 'blue', alignSelf: 'center' }}
            style={{
              width: 300,
              backgroundColor: '#FFF0E0',
              borderColor: 'white',
              borderWidth: 1,
              marginTop: 20,
              color: 'blue',
            }}
            selectedValue={this.state.studentSelected}
            onValueChange={student => this.setState({ studentSelected: student })}
          >
            {students.map(student => (
              <Picker.Item
                label={`${student.nameFirst} ${student.nameLast}`}
                value={`${student.nameFirst} ${student.nameLast}`}
              />
            ))}
          </Picker>
          <Button
            buttonStyle={[{ marginBottom: 10, marginTop: 40 }]}
            title="Give Badge"
            iconRight={{ name: 'done' }}
            backgroundColor="#5fad56"
            borderRadius={5}
            onPress={this.postBadge}
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(BadgeTime);

BadgeTime.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


import React from 'react';
import axios from 'axios';
import { StyleSheet, View, ImageBackground, Picker, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { Button, Text } from 'react-native-elements';
import PropTypes from 'prop-types';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { SERVER_URI, SendBadges, SendBadgeNotification } from '../../constant';
import { white } from '../../style/colors';

class BadgeSpirit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentSelected: '',
      sending: false,
    };
    this.postBadge = this.postBadge.bind(this);
  }

  postBadge = async () => {
    this.setState({ sending: true });
    const badgeId = 3; // id for spirit
    const { students } = this.props.state.classInfo;
    const className = this.props.state.selectSession.sessionName;
    const teacherName = `${this.props.state.user.First_name} ${this.props.state.user.Last_name}`;
    const studentName = this.state.studentSelected;
    const student = this.state.studentSelected.split(' ');
    const studentArr = students.filter(item => item.nameFirst === student[0] && item.nameLast === student[1]);
    const studentId = studentArr[0].participantId;
    const userId = studentArr[0].id;

    await axios.post(`${SERVER_URI}${SendBadges}`, { badgeId, studentId })
      // .then(res => console.log(res))
      .catch(err => console.error(err));
    await axios.post(`${SERVER_URI}${SendBadgeNotification}`, {
      className, userId, studentName, teacherName
    })
      // .then(res => console.log(res))
      .catch(err => console.error(err));
    this.setState({ sending: false })
    alert(`Spirit badge sent to ${studentName}!`);
    this.props.navigation.goBack();
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
        color: '#FF9F1C',
        textAlign: 'center',
        textShadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        textShadowOffset: { width: 5, height: 3 },
        backgroundColor: 'transparent',
      },
      icon: {
        textShadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        textShadowOffset: { width: 5, height: 3 },
        backgroundColor: 'transparent',
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
            color="#FF9F1C"
            name="star"
            size={100}
            style={styles.icon}
          />
          <Text h3 style={styles.text}>Spirit Badge</Text>
          <Picker
            itemStyle={{ color: 'black' }}
            style={{
              width: 300,
              backgroundColor: '#FF9F1C',
              borderColor: 'black',
              borderWidth: 1,
              marginTop: 20,
              color: 'black',
              textShadowColor: 'black',
              shadowOpacity: 0.8,
              shadowRadius: 5,
              textShadowOffset: { width: 5, height: 3 },
            }}
            selectedValue={this.state.studentSelected}
            onValueChange={student => this.setState({ studentSelected: student })}
          >
            <Picker.Item label="PICK A STUDENT" />
            {students.map(student => (
              <Picker.Item
                label={`${student.nameFirst} ${student.nameLast}`}
                value={`${student.nameFirst} ${student.nameLast}`}
              />
            ))}
          </Picker>
          {!this.state.sending ?
            <Button
              buttonStyle={[{ marginBottom: 10, marginTop: 40 }]}
              title="Give Badge"
              iconRight={{ name: 'done', color: 'black' }}
              backgroundColor={this.state.studentSelected ? '#FF9F1C' : 'grey'}
              color="black"
              borderRadius={5}
              onPress={this.state.studentSelected ? this.postBadge : null}
            />
            :
              <ActivityIndicator color={white} style={{ marginTop: 40 }} />
          }
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(BadgeSpirit);

BadgeSpirit.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


import React from 'react';
import { StyleSheet, View, ImageBackground, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';

class BadgeTime extends React.Component {
  constructor(props) {
    super(props);
    console.log('badge');
    // console.log(this.props.state.classInfo.students);
    this.state = { studentSelected: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
            // onPress={}
            style={styles.icon}
          />
          <Picker
            style={{ width: 100 }}
            selectedValue={this.state.studentSelected}
            onValueChange={student => this.setState({ studentSelected: student })}
          >
            {students.map(student => (
              <Picker.Item label={student.nameFirst} value={student.nameFirst} />
            ))}
          </Picker>
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


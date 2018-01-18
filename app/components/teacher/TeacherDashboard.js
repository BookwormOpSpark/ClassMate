import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Text, Button, Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut } from '../../actions/actions';


class TeacherDashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('Teacher dashboard', props);
    this.state = {};
    this.LogOut = this.LogOut.bind(this);
  }

  LogOut = async () => {
    await this.props.dispatch(logOut());
    this.props.navigation.navigate('FirstPage');
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    });
    const teacher = this.props.state.user;
    console.log('Teacher dashboard this.props.state');
    console.log(this.props.state);
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `Teacher ${teacher.First_name} Dashboard`, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ width: Dimensions.get('window').width }}
        />
        <Text h5>Your Class Schedule</Text>
        <Icon color="blue" name="calendar" size={30} />

        <Text h5>Upcoming Due Dates</Text>
        <Icon color="blue" name="bell" size={30} />

        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={() => this.props.navigation.navigate('TeacherClassNavigation')}
          iconRight={{ name: 'directions-run' }}
          backgroundColor="blue"
          rounded
          title="Go to Class Biology"
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={() => this.props.navigation.navigate('AddClass')}
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          title="Add a Class"
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          onPress={this.LogOut}
          iconRight={{ name: 'enhanced-encryption' }}
          backgroundColor="blue"
          rounded
          title="Log Out"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(TeacherDashboard);

TeacherDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

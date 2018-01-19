import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Text, Button, Header, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { logOut } from '../../actions/actions';


class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log('student dashboard', props);
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
      bigcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      list: {
        borderRadius: 5,
        borderColor: 'blue',
        backgroundColor: 'blue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
      },
    });
    const { user } = this.props.state;
    const { session } = this.props.state;
    console.log('studentdashboardsession', session);
    console.log('student dashboard this.props.state');
    console.log(this.props.state);
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: `Student ${user.First_name} Dashboard`, style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          outerContainerStyles={{ width: Dimensions.get('window').width }}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <View style={styles.container}>
            <Text h5>Your Class Schedule</Text>
            <Icon color="blue" name="calendar" size={30} />

            <Text h5>Upcoming Due Dates</Text>
            <Icon color="blue" name="bell" size={30} />

            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
              iconRight={{ name: 'directions-run' }}
              backgroundColor="pink"
              rounded
              title="Go to Class Biology"
            />

            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={() => this.props.navigation.navigate('JoinClass')}
              iconRight={{ name: 'done' }}
              backgroundColor="green"
              rounded
              title="Join a Class"
            />
            <Button
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              onPress={this.LogOut}
              iconRight={{ name: 'enhanced-encryption' }}
              backgroundColor="red"
              rounded
              title="Log Out"
            />
          </View>

          <View style={{ flex: 1 }}>
            {session.length === 0
            ? null
            : <View style={{ flex: 1 }}>
              <List containerStyle={{ flex: 1 }}>
                <Text>
                  Your Classes
                </Text>
                {session.map((item, id) => (
                  <ListItem
                    containerStyle={styles.list}
                    key={`bbbtn${id}`}
                    title={`${item.name}`}
                    leftIcon={{ name: 'book' }}
                    titleStyle={{ color: 'white' }}
                    onPress={() => this.props.navigation.navigate('StudentClassNavigation')}
                  />
                ))}
              </List>
            </View>}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});


export default connect(mapStateToProps)(StudentDashboard);

StudentDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';

class TeacherClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const className = this.props.state.selectSession.sessionName;
    const styles = StyleSheet.create({
      bigContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      button: {
        marginBottom: 15,
        marginTop: 15,
        width: 150,
        height: 100,
        alignContent: 'center',
      },
      shadow: {
        borderWidth: 1,
        borderRadius: 2,
        shadowColor: 'white',
        shadowOffset: { width: 5, height: 3 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
      },
    });

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
        <View style={styles.bigContainer}>
          <Text style={{ marginBottom: 30 }}> Hi </Text>
          <View style={styles.container}>
            <Button
              onPress={() => this.props.navigation.navigate('Assignment')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'assignment', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="Assignment"
            />
            <Button
              onPress={() => this.props.navigation.navigate('Queue')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'thumb-up', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="Queue"
            />
            <Button
              onPress={() => this.props.navigation.navigate('QRcode')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'code', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="QR code"
            />
            <Button
              onPress={() => this.props.navigation.navigate('ClassRoster')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'person', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="Class Roster"
            />
            <Button
              onPress={() => this.props.navigation.navigate('ClassBadges')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'local-pizza', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="Badges"
            />
            <Button
              onPress={() => this.props.navigation.navigate('CurrentPostedFunNavigation')}
              buttonStyle={styles.button}
              fontWeight="bold"
              fontFamily="monospace"
              iconRight={{ name: 'movie', color: 'black' }}
              backgroundColor="#f4d35e"
              borderRadius={5}
              color="black"
              title="Fun Stuff"
            />
          </View>
        </View>
      </ImageBackground>

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

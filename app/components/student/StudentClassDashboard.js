import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';

class StudentClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    const className = this.props.state.selectSession.sessionName;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      badges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      icon: {
        textShadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        textShadowOffset: { width: 5, height: 3 },
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
        <View style={styles.container}>
          <Icon color="#faf0ca" name="rocket" size={30} />

          <View style={styles.badges}>

            <View style={styles.item}>
              <Icon
                color="#FF9F1C"
                name="paw"
                size={100}
                onPress={() => this.props.navigation.navigate('RaiseHand')}
                style={styles.icon}
              />
              <Button
                onPress={() => this.props.navigation.navigate('RaiseHand')}
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                backgroundColor="#FF9F1C"
                rounded
                small
                color="white"
                title="Raise Hand"
              />
            </View>

            <View style={styles.item}>
              <Icon
                color="#2EC4B6"
                name="book-open-variant"
                style={styles.icon}
                size={100}
                onPress={() => this.props.navigation.navigate('Assignment')}
              />
              <Button
                onPress={() => this.props.navigation.navigate('Assignment')}
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                backgroundColor="#2EC4B6"
                small
                rounded
                title="Homework"
              />
            </View>

            <View style={styles.item}>
              <Icon
                color="#f95738"
                name="calendar"
                style={styles.icon}
                size={100}
                onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
              />
              <Button
                onPress={() => this.props.navigation.navigate('StudentClassSchedule')}
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                backgroundColor="#f95738"
                small
                rounded
                title="Daily Schedule"
              />
            </View>

            <View style={styles.item}>
              <Icon
                color="gold"
                name="lightbulb-on"
                style={styles.icon}
                size={100}
                onPress={() => this.props.navigation.navigate('Fun')}
              />
              <Button
                onPress={() => this.props.navigation.navigate('Fun')}
                buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
                backgroundColor="gold"
                small
                color="black"
                rounded
                title="Fun Stuffs!"
              />
            </View>
          </View>
        </View>
      </ImageBackground>

    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(StudentClassDashboard);


StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

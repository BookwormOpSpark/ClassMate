import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, Animated, Easing } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { green } from '../../style/colors';


class ClassBadges extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.7);
    this.animatedValue = new Animated.Value(0);
  }
  componentDidMount() {
  }


  render() {
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
      button: {
        marginBottom: 5,
        marginTop: 5,
        alignSelf: 'center',
      },
      animated: {
        // transform: [{ scale: this.springValue }],
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
          back={false}
        />
        <View style={styles.container}>

          <View style={styles.badges}>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="#FF9F1C"
                  name="star"
                  size={100}
                  onPress={() => this.props.navigation.navigate('BadgeSpirit')}
                  style={styles.icon}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('BadgeSpirit')}
                  buttonStyle={styles.button}
                  backgroundColor="#FF9F1C"
                  rounded
                  small
                  color="black"
                  title="Good Spirit"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="#2EC4B6"
                  name="spellcheck"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('BadgeGrade')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('BadgeGrade')}
                  buttonStyle={styles.button}
                  backgroundColor="#2EC4B6"
                  small
                  rounded
                  color="black"
                  title="Grades"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color={green}
                  name="group"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('BadgeParticipation')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('BadgeParticipation')}
                  buttonStyle={styles.button}
                  backgroundColor={green}
                  small
                  rounded
                  color="black"
                  title="Participation"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="gold"
                  name="schedule"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('BadgeTime')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('BadgeTime')}
                  buttonStyle={styles.button}
                  backgroundColor="gold"
                  small
                  color="black"
                  rounded
                  title="Punctuality"
                />
              </Animated.View>
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

export default connect(mapStateToProps)(ClassBadges);


ClassBadges.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

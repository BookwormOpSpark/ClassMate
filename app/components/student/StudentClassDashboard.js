import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground, Animated, Easing } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import blackboard from '../../assets/blackboard.jpg';

class StudentClassDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.7);
    this.animatedValue = new Animated.Value(0);
    this.spring = this.spring.bind(this);
  }
  componentDidMount() {
    this.spring();
  }
  spring() {
    this.springValue.setValue(0.7);
    Animated.spring(
      this.springValue,
      {
        toValue: 1,
        friction: 1,
        tension: 1,
      },
    ).start();
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
        transform: [{ scale: this.springValue }],
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

          <View style={styles.badges}>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="#FF9F1C"
                  name="paw"
                  size={100}
                  onPress={() => this.props.navigation.navigate('RaiseHand')}
                  style={styles.icon}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('RaiseHand')}
                  buttonStyle={styles.button}
                  backgroundColor="#FF9F1C"
                  rounded
                  small
                  color="black"
                  title="Raise Hand"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="#2EC4B6"
                  name="book-open-variant"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('Assignment')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('Assignment')}
                  buttonStyle={styles.button}
                  backgroundColor="#2EC4B6"
                  small
                  rounded
                  color="black"
                  title="Homework"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="#f95738"
                  name="trophy"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('StudentBadges')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('StudentBadges')}
                  buttonStyle={styles.button}
                  backgroundColor="#f95738"
                  small
                  rounded
                  color="black"
                  title="Badges"
                />
              </Animated.View>
            </View>

            <View style={styles.item}>
              <Animated.View
                style={styles.animated}
              >
                <Icon
                  color="gold"
                  name="lightbulb-on"
                  style={styles.icon}
                  size={100}
                  onPress={() => this.props.navigation.navigate('Fun')}
                />
                <Button
                  onPress={() => this.props.navigation.navigate('Fun')}
                  buttonStyle={styles.button}
                  backgroundColor="gold"
                  small
                  color="black"
                  rounded
                  title="Fun Stuffs!"
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

export default connect(mapStateToProps)(StudentClassDashboard);


StudentClassDashboard.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

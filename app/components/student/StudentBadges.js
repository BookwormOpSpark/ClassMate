import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { Text, Button } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Image, FlatList, ImageBackground, Animated, Easing } from 'react-native';
import blackboard from '../../assets/blackboard.jpg';
import { SERVER_URI, SendBadges } from '../../constant';
import DashHeader from '../shared/Header';
import { white } from '../../style/colors';


class StudentBadges extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.spinValue = new Animated.Value(0);
    this.state = {};

    this.renderBadgeGrade = this.renderBadgeGrade.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.animate = this.animate.bind(this);
    this.spin = this.spin.bind(this);

    this.styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
      },
      list: {
        flex: 1,
        // justifyContent: 'space-around',
        flexDirection: 'row',
      },
      view: {
        marginBottom: 7,
        marginLeft: 5,
        marginRight: 5,
      },
      text: {
        textAlign: 'center',
        color: '#f4d35e',
        marginBottom: 5,
      },
      btext: {
        color: white,
      },
      image: {
        width: 65,
        height: 65,
        borderRadius: 65,
      },
    });
  }

  componentDidMount() {
    const studentID = this.props.state.selectSession.participantID;
    axios.get(`${SERVER_URI}${SendBadges}`, {
      params: {
        studentID,
      },
    })
      .then((res) => {
        const badgesInit = res.data;
        const badges = badgesInit.reduce((memo, curr) => {
          memo[curr.id_badge] ? memo[curr.id_badge].push(1) : memo[curr.id_badge] = [1];
          return memo;
        }, {});
        this.setState({ badges });
      })
      .catch(err => console.error(err));

    this.animate(Easing.bounce);
    this.spin();
  }

  animate(easing) {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 1000,
        easing,
      },
    ).start();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      },
    ).start(() => this.spin());
  }

  keyExtractor = item => item;

  renderBadgeGrade(item) {
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStartValue(), getEndValue()],
    });
    return (
      <View style={this.styles.view}>
        <Animated.View
          style={{ transform: [{ rotate: spin }] }}
        >
          <Image
            style={this.styles.image}
            source={require('../../assets/grades.jpg')}
          />
        </Animated.View>
      </View>
    );
  }
  renderBadgeTime(item) {
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStartValue(), getEndValue()],
    });
    return (
      <View style={this.styles.view}>
        <Animated.View
          style={{ transform: [{ rotate: spin }] }}
        >
          <Image
            style={this.styles.image}
            source={require('../../assets/clock.png')}
          />
        </Animated.View>
      </View>
    );
  }
  renderBadgeSpirit(item) {
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStartValue(), getEndValue()],
    });
    return (
      <View style={this.styles.view}>
        <Animated.View
          style={{ transform: [{ rotate: spin }] }}
        >
          <Image
            style={this.styles.image}
            source={require('../../assets/spiritgood.png')}
          />
        </Animated.View>
      </View>
    );
  }
  renderBadgeParticipation(item) {
    const getStartValue = () => '0deg';
    const getEndValue = () => '360deg';
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: [getStartValue(), getEndValue()],
    });
    return (
      <View style={this.styles.view}>
        <Animated.View
          style={{ transform: [{ rotate: spin }] }}
        >
          <Image
            style={this.styles.image}
            source={require('../../assets/curious.png')}
          />
        </Animated.View>
      </View>
    );
  }

  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [-3, 1],
      outputRange: [0, 260],
    });
    const className = this.props.state.selectSession.sessionName;

    const badgeGrade = this.state.badges ? this.state.badges['1'] : [];
    const badgeTime = this.state.badges ? this.state.badges['2'] : [];
    const badgeSpirit = this.state.badges ? this.state.badges['3'] : [];
    const badgeParticipation = this.state.badges ? this.state.badges['4'] : [];

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
        <View style={this.styles.container}>
          <ScrollView
            contentContainerStyle={this.styles.contentContainer}
            scrollEnabled
          >
            <Text
              h3
              style={this.styles.text}
            >
          My Badges!
            </Text>

            {!!badgeGrade && !!badgeGrade.length && <Text style={this.styles.btext}>  Good Grades Badges </Text>}
            <FlatList
              contentContainerStyle={this.styles.list}
              renderItem={item => this.renderBadgeGrade(item)}
              data={badgeGrade}
              keyExtractor={this.keyExtractor}
            />

            {!!badgeTime && !!badgeTime.length && <Text style={this.styles.btext}>  Punctuality Badges </Text>}
            <FlatList
              contentContainerStyle={this.styles.list}
              renderItem={item => this.renderBadgeTime(item)}
              data={badgeTime}
              keyExtractor={this.keyExtractor}
            />
            {!!badgeParticipation && !!badgeParticipation.length && <Text style={this.styles.btext}>  Participation Badges </Text>}
            <FlatList
              contentContainerStyle={this.styles.list}
              renderItem={item => this.renderBadgeParticipation(item)}
              data={badgeParticipation}
              keyExtractor={this.keyExtractor}
            />

            {!!badgeSpirit && !!badgeSpirit.length && <Text style={this.styles.btext}>  Great Spirit Badges </Text>}
            <FlatList
              contentContainerStyle={this.styles.list}
              renderItem={item => this.renderBadgeSpirit(item)}
              data={badgeSpirit}
              keyExtractor={this.keyExtractor}
            />
          </ScrollView>
        </View>
      </ImageBackground>

    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(StudentBadges);
StudentBadges.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

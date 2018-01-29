import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, ScrollView, ActivityIndicator, ImageBackground, Image, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import axios from 'axios';
import { Container, Header, Title, Left, Right, Button, Body, Content, Card, CardItem, H3 } from 'native-base';
import { connect } from 'react-redux';
import { logOut, getDashboard, selectSession } from '../../actions/actions';
import { SERVER_URI, DashboardRoute } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';
import logo from '../../assets/classmatelogoicon.png';
import { blue, white, yellow, orange, red, green } from '../../style/colors';

export default class DashHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { navigation, className, back } = this.props;
    return (
      <Header style={{ backgroundColor: blue, justifyContent: 'center' }}>
        <Left style={{ flexDirection: 'row' }}>
          {back &&
            <Button
              transparent
              onPress={() => navigation.goBack()}
              style={{ marginRight: 10 }}
            >
              <Icon name="arrow-left-thick" size={30} color={yellow} />
            </Button>
          }
          <Button
            transparent
            onPress={() => navigation.navigate('DrawerOpen')}
          >
            <Icon name="menu" size={30} color={yellow} />
          </Button>
        </Left>
        <Body>
          <H3 style={{ color: yellow }} >{className}</H3>
        </Body>
        <Right>
          <Image source={logo} style={{ width: 30, height: 30 }} />
        </Right>
      </Header>

    );
  }
}

DashHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};
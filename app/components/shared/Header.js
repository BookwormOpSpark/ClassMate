import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'native-base';
import logo from '../../assets/classmatelogoicon.png';
import { blue, yellow } from '../../style/colors';

export default class DashHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { navigation, className, back } = this.props;
    return (
      <Header
        backgroundColor={blue}
        statusBarProps={{ barStyle: 'light-content' }}
        leftComponent={
          back ?
            <Button
              transparent
              onPress={() => navigation.goBack()}
              style={{ marginRight: 10 }}
            >
              <Icon name="arrow-left-thick" size={30} color={yellow} style={{ marginTop: 30 }} />
            </Button>
          :
            <Button
              transparent
              onPress={() => navigation.navigate('DrawerOpen')}
            >
              <Icon name="menu" size={30} color={yellow} style={{ marginTop: 30 }} />
            </Button>
        }
        centerComponent={{ text: className, style: { color: yellow, fontSize: 20, marginTop: 30 } }}
        rightComponent={<Image source={logo} style={{ width: 20, height: 20, marginTop: 40 }} />}
      />
    );
  }
}

DashHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
};
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { Badge, Icon } from 'native-base';

import DashHeader from '../shared/Header';
import blackboard from '../../assets/blackboard.jpg';

export default class StudentBadges extends React.Component {
  constructor() {
    super();
    this.state = { text: '' };
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
        <DashHeader
          navigation={this.props.navigation}
          className="badges"
          back
        />
        <View style={styles.container}>
          <View style={styles.badges}>
            <Badge
              primary
              style={{ width: 100, height: 100, borderRadius: 100 }}
            >
              <Icon
                name="star"
                style={{
 fontSize: 30, color: 'yellow', lineHeight: 20, alignSelf: 'center', marginTop: 10,
}}
              />
              <Text style={{ alignSelf: 'center', alignItems: 'center', color: 'yellow' }}> Award for good grades!</Text>
            </Badge>
            <Badge
              success
              style={{ width: 100, height: 100, borderRadius: 100 }}
            >
              <Icon
                name="star"
                style={{
 fontSize: 30, color: 'yellow', lineHeight: 20, alignSelf: 'center', marginTop: 10,
}}
              />
              <Text style={{ alignSelf: 'center', alignItems: 'center', color: 'yellow' }}> Award for good participation!</Text>
            </Badge>
            <Badge
              info
              style={{ width: 100, height: 100, borderRadius: 100 }}
            >
              <Icon
                name="star"
                style={{
 fontSize: 30, color: 'yellow', lineHeight: 20, alignSelf: 'center', marginTop: 10,
}}
              />
              <Text style={{ alignSelf: 'center', alignItems: 'center', color: 'yellow' }}> Award for good punctuality!</Text>
            </Badge>
            <Badge
              warning
              style={{ width: 100, height: 100, borderRadius: 100 }}
            >
              <Icon
                name="star"
                style={{
 fontSize: 30, color: 'yellow', lineHeight: 20, alignSelf: 'center', marginTop: 10,
}}
              />
              <Text style={{ alignSelf: 'center', alignItems: 'center', color: 'yellow' }}> Award for good behavior!</Text>
            </Badge>

          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
      allBadges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      badge: {
        width: 150,
        height: 150,
        borderRadius: 150,
        marginTop: 15,
        marginBottom: 15,
      },
      icon: {
        fontSize: 30,
        color: 'yellow',
        lineHeight: 20,
        alignSelf: 'center',
        marginTop: 30,
      },
      text: {
        textAlign: 'center',
        alignItems: 'center',
        color: 'yellow',
        fontSize: 15,
        fontStyle: 'italic',
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
          <View style={styles.allBadges}>
            <Badge
              primary
              style={styles.badge}
            >
              <Icon
                name="star"
                style={styles.icon}
              />
              <Text style={styles.text}> Award for good grades!</Text>
            </Badge>
            <Badge
              info
              style={styles.badge}
            >
              <Icon
                name="star"
                style={styles.icon}
              />
              <Text style={styles.text}> Award for good behavior!</Text>
            </Badge>
            <Badge
              danger
              style={styles.badge}
            >
              <Icon
                name="star"
                style={styles.icon}
              />
              <Text style={styles.text}> Award for good attitude!</Text>
            </Badge>
            <Badge
              warning
              style={styles.badge}
            >
              <Icon
                name="star"
                style={styles.icon}
              />
              <Text style={styles.text}> Award for good grades!</Text>
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

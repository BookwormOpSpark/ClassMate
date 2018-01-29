import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Permissions, Notifications } from 'expo';
import { SERVER_URI, SendNotifications } from '../../constant';
import DashHeader from '../shared/Header';
import blackboard from '../../assets/blackboard.jpg';

export default class ClassBadges extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this);
  }

  componentDidMount() {
  }


  registerForPushNotificationsAsync= async () => {
    const PUSH_ENDPOINT = `${SERVER_URI}${SendNotifications}`;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    const token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can
    // retrieve it to send push notifications.
    return fetch(PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: {
          value: token,
        },
        user: {
          username: 'Lili',
        },
      }),
    });
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
          <Text h1>Class Badges</Text>
          <Button
            onPress={this.registerForPushNotificationsAsync}
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            backgroundColor="#FF9F1C"
            rounded
            small
            color="black"
            title="Send Notification Badges"
          />
        </View>
      </ImageBackground>
    );
  }
}


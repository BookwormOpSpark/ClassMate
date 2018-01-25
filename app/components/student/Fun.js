import React from 'react';
import { StyleSheet, View, ScrollView, Image, WebView, Platform, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import { Video } from 'expo';

export default class StudentClassSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      WebViewContainer: {
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
      },
    });
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <Text h1>Class Mate</Text>
          <Text h4>Student Class Sharing</Text>
          <Video
            // source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            source={{ uri: 'https://s3.amazonaws.com/classmate2/20180123_144356.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={{ width: 300, height: 300 }}
          />


          <Image
            style={{ width: 300, height: 200 }}
            source={{ uri: 'https://media.giphy.com/media/fT2symKaq961i/giphy.gif' }}
          />
          <Image
            style={{ width: 300, height: 200 }}
            source={{ uri: 'https://media4.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif' }}
          />

          <Image source={{ uri: 'https://s3.amazonaws.com/classmate2/largetree.jpg' }} style={{ width: 250, height: 350 }} />


          <Text
            style={{ color: 'blue' }}
            onPress={() => Linking.openURL('http://google.com')}
          >
            Google
          </Text>
          <WebView
            style={{ width: 300, height: 300 }}
            source={{ html: '<html><body>Look Ma a video! <br /> <iframe width="560" height="315" src="https://www.youtube.com/embed/RJa4kG1N3d0" frameborder="0" allowfullscreen></iframe></body></html>' }}
          />


          <WebView
            style={{ width: 300, height: 300 }}
            javaScriptEnabled
            source={{ uri: 'https://www.youtube.com/embed/2d7s3spWAzo?rel=0&autoplay=0&showinfo=0&controls=0' }}
          />


          <WebView
            style={{ width: 300, height: 300 }}
            ref={(ref) => { this.videoPlayer = ref; }}
            scalesPageToFit
            source={{ html: '<html><meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" /><iframe src="https://www.youtube.com/embed/' + '2d7s3spWAzo' + '?modestbranding=1&playsinline=1&showinfo=0&rel=0" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"></iframe></html>' }}
            // onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
          />


        </ScrollView>

      </View>
    );
  }
}

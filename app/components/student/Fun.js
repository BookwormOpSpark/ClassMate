import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Image, WebView, Linking } from 'react-native';
import { Text, List, ListItem } from 'react-native-elements';
import { Video } from 'expo';
import { Card, CardItem, Body } from 'native-base';
import { SERVER_URI, PostFunStuff } from '../../constant';

class Fun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fun: [
        { type: 'video', link: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { type: 'youtube', link: 'https://youtu.be/90CCjgX0n20' },
        { type: 'internet', link: 'http://google.com' },
        { type: 'image', link: 'https://media4.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif' },
        { type: 'youtube', link: 'https://www.youtube.com/watch?v=QSF89VAZqHI&t=3012s' },
        { type: 'image', link: 'https://s3.amazonaws.com/classmate2/largetree.jpg' },
        { type: 'youtube', link: 'https://www.youtube.com/embed/2d7s3spWAzo?rel=0&autoplay=0&showinfo=0&controls=0' },
      ],
    };
  }

  componentDidMount() {
    const session = this.props.state.selectSession.sessionID || 2;
    axios.get(`${SERVER_URI}${PostFunStuff}/${session}`)
      .then(res => this.setState({ fun: res.data }))
      .catch(err => console.error(err));
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
      },
      item: {
        width: 300,
        height: 300,
        marginBottom: 40,
      },
    });
    const className = this.props.state.selectSession.sessionName;

    const list = this.state.fun;
    const videoList = list.filter(item => item.type === 'video') || [];
    const imageList = list.filter(item => item.type === 'image') || [];
    const youtubeList = list.filter(item => item.type === 'youtube') || [];
    const internetList = list.filter(item => item.type === 'internet') || [];
    // console.log(videoList);
    // console.log(this.state, 'this is state in FUN');

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          scrollEnabled
        >
          <Text h1 style={{ textAlign: 'center', color: 'blue' }}>{`Class ${className}`}</Text>
          <Text
            h4
            style={{ textAlign: 'center', color: 'blue', marginBottom: 40 }}
          >
            Interesting things to check out!
          </Text>


          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.item}
          />

          <Image
            style={styles.item}
            source={{ uri: 'https://media4.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif' }}
          />

          <Image
            source={{ uri: 'https://s3.amazonaws.com/classmate2/largetree.jpg' }}
            style={styles.item}
          />

          <Card style={{ marginBottom: 15 }}>
            <CardItem>
              <Body>
                <Text
                  style={{ color: 'blue', fontWeight: 'bold' }}
                  onPress={() => Linking.openURL('http://google.com')}
                >
                  Link to open to wonders!
                </Text>
              </Body>
            </CardItem>
          </Card>

          <WebView
            style={styles.item}
            javaScriptEnabled
            source={{ uri: 'https://www.youtube.com/watch?v=QSF89VAZqHI&t=3012s' }}
          />

        </ScrollView>

      </View>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(Fun);
Fun.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

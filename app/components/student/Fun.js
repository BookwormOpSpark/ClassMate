import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Image, WebView, Linking, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
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
        { type: 'video', link: 'https://s3.amazonaws.com/classmate2/20180123_144356.mp4' },
        { type: 'youtube', link: 'https://www.youtube.com/watch?v=QSF89VAZqHI&t=3012s' },
        { type: 'image', link: 'https://s3.amazonaws.com/classmate2/largetree.jpg' },
        { type: 'youtube', link: 'https://www.youtube.com/embed/2d7s3spWAzo?rel=0&autoplay=0&showinfo=0&controls=0' },
      ],
    };

    this.renderVideo = this.renderVideo.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderYouTube = this.renderYouTube.bind(this);
    this.renderInternetLink = this.renderInternetLink.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);
    this.videoList = this.state.fun.filter(item => item.type === 'video') || [];

    this.styles = StyleSheet.create({
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
        width: 310,
        height: 280,
        marginBottom: 40,
      },
      video: {
        width: 310,
        height: 210,
        marginBottom: 40,
      },
      text: {
        color: 'blue',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });
  }

  componentDidMount() {
    const session = this.props.state.selectSession.sessionID || 5;
    axios.get(`${SERVER_URI}${PostFunStuff}/${session}`)
      .then((res) => {
        console.log('res.data');
        console.log(res.data);
        this.setState({ fun: res.data });
      })
      .catch(err => console.error(err));
  }

  keyExtractor = item => item.link;

  renderVideo(item) {
    return (
      <Video
        style={this.styles.video}
        source={{ uri: item.link }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        paused
        progressUpdateIntervalMillis={1000}
      />
    );
  }

  renderImage(item) {
    return (
      <Image
        style={this.styles.item}
        source={{ uri: item.link }}
      />
    );
  }

  renderYouTube(item) {
    return (
      <WebView
        style={this.styles.item}
        javaScriptEnabled
        source={{ uri: item.link }}
      />
    );
  }

  renderInternetLink(item) {
    const { link } = item;
    const about = link.split('/')[2];
    return (
      <Card style={{ marginBottom: 15 }}>
        <CardItem>
          <Body>
            <Text
              style={this.styles.text}
              onPress={() => Linking.openURL(link)}
            >
              Link Recommended by Teacher about {about}
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }

  render() {
    const className = this.props.state.selectSession.sessionName;

    const list = this.state.fun;
    const videoList = list.filter(item => item.type === 'video') || [];
    const imageList = list.filter(item => item.type === 'image') || [];
    const youtubeList = list.filter(item => item.type === 'youtube') || [];
    const internetList = list.filter(item => item.type === 'internet') || [];

    return (
      <View style={this.styles.container}>
        <ScrollView
          contentContainerStyle={this.styles.contentContainer}
          scrollEnabled
        >
          <Text h1 style={this.styles.text}>{`Class ${className}`}</Text>
          <Text
            h4
            style={{ textAlign: 'center', color: 'blue', marginBottom: 40 }}
          >
            Interesting things to check out!
          </Text>

          <FlatList
            contentContainerStyle={this.styles.container}
            renderItem={({ item }) => this.renderVideo(item)}
            data={videoList}
            keyExtractor={this.keyExtractor}
          />
          <FlatList
            contentContainerStyle={this.styles.container}
            renderItem={({ item }) => this.renderImage(item)}
            data={imageList}
            keyExtractor={this.keyExtractor}
          />
          <FlatList
            contentContainerStyle={this.styles.container}
            renderItem={({ item }) => this.renderYouTube(item)}
            data={youtubeList}
            keyExtractor={this.keyExtractor}
          />
          <FlatList
            renderItem={({ item }) => this.renderInternetLink(item)}
            data={internetList}
            keyExtractor={this.keyExtractor}
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

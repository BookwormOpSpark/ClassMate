import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { StyleSheet, View, ScrollView, Image, WebView, Linking, FlatList, SwipeRow, Icon } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Video } from 'expo';
import { Card, CardItem, Body } from 'native-base';
import { SERVER_URI, PostFunStuff } from '../../constant';

class CurrentPostedFun extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fun: [
        { type: 'video', link: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
        { type: 'youtube', link: 'https://youtu.be/90CCjgX0n20' },
        { type: 'internet', link: 'http://google.com' },
        { type: 'image', link: 'https://media4.giphy.com/avatars/nikdudukovic/ylDRTR05sy6M.gif' },
      ],
    };

    this.renderVideo = this.renderVideo.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.renderYouTube = this.renderYouTube.bind(this);
    this.renderInternetLink = this.renderInternetLink.bind(this);
    this.keyExtractor = this.keyExtractor.bind(this);

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
    const videoList = list.length > 0 ? list.filter(item => item.type === 'video') : [];
    const imageList = list.length > 0 ? list.filter(item => item.type === 'image') : [];
    const youtubeList = list.length > 0 ? list.filter(item => item.type === 'youtube') : [];
    const internetList = list.length > 0 ? list.filter(item => item.type === 'internet') : [];

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
            Currently Posted Fun Stuff for students!
          </Text>

          <Button
            onPress={() => this.props.navigation.navigate('FunPost')}
            buttonStyle={[{ marginBottom: 40, marginTop: 10 }]}
            iconRight={{ name: 'done' }}
            backgroundColor="green"
            title="Add more stuff!"
          />

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

export default connect(mapStateToProps)(CurrentPostedFun);
CurrentPostedFun.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

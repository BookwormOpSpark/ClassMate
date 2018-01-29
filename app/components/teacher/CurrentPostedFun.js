import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { Text } from 'react-native-elements';
import { Video } from 'expo';
import { Card, CardItem, Body, Button, Icon } from 'native-base';
import { StyleSheet, View, ScrollView, Image, WebView, Linking, FlatList, ImageBackground } from 'react-native';
import blackboard from '../../assets/blackboard.jpg';
import { SERVER_URI, PostFunStuff } from '../../constant';
import DashHeader from '../shared/Header';

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
        alignItems: 'center',
        justifyContent: 'center',
      },
      contentContainer: {
        flexGrow: 1,
      },
      item: {
        width: 310,
        height: 280,
      },
      view: {
        marginBottom: 40,
        alignItems: 'center',
      },
      buttonAdd: {
        marginBottom: 30,
        marginTop: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 300,
      },
      video: {
        width: 310,
        height: 210,
      },
      text: {
        color: '#f4d35e',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      button: {
        marginTop: 10,
        height: 30,
        width: 310,
        backgroundColor: 'red',
        opacity: 0.6,
        alignSelf: 'center',
      },
      link: {
        color: '#0d3b66',
        fontWeight: 'bold',
        textAlign: 'center',
      },
    });
  }

  componentDidMount() {
    const session = this.props.state.selectSession.sessionID || 5;
    axios.get(`${SERVER_URI}${PostFunStuff}/${session}`)
      .then((res) => {
        this.setState({ fun: res.data });
      })
      .catch(err => console.error(err));
  }

  keyExtractor = item => item.link;

  renderVideo(item) {
    const dateUpload = moment(item.createdAt).format('MMM Do YY');
    return (
      <View style={this.styles.view}>
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

        <Button
          onPress={() => this.onDelete(item)}
          danger
          bordered
          style={this.styles.button}
        >
          <Text style={{ color: 'white' }}>{`Uploaded ${dateUpload}`}</Text>
          <Icon
            active
            name="trash"
            style={{ color: 'white' }}
          />
        </Button>
      </View>
    );
  }

  renderImage(item) {
    const dateUpload = moment(item.createdAt).format('MMM Do YY');

    return (
      <View style={this.styles.view}>
        <Image
          style={this.styles.item}
          source={{ uri: item.link }}
        />
        <Button
          onPress={() => this.onDelete(item)}
          danger
          bordered
          style={this.styles.button}
        >
          <Text style={{ color: 'white' }}>{`Uploaded ${dateUpload}`}</Text>
          <Icon
            active
            name="trash"
            style={{ color: 'white' }}
          />
        </Button>
      </View>
    );
  }

  renderYouTube(item) {
    const dateUpload = moment(item.createdAt).format('MMM Do YY');

    return (
      <View style={this.styles.view}>
        <WebView
          style={this.styles.item}
          javaScriptEnabled
          source={{ uri: item.link }}
        />
        <Button
          onPress={() => this.onDelete(item)}
          danger
          bordered
          style={this.styles.button}
        >
          <Text style={{ color: 'white' }}>{`Uploaded ${dateUpload}`}</Text>
          <Icon
            active
            name="trash"
            style={{ color: 'white' }}
          />
        </Button>
      </View>
    );
  }

  renderInternetLink(item) {
    const dateUpload = moment(item.createdAt).format('MMM Do YY');

    const { link } = item;
    const about = link.split('/')[2];
    return (
      <View style={{ marginBottom: 40 }}>
        <Card style={{ width: 300, alignSelf: 'center' }}>
          <CardItem>
            <Body>
              <Text
                style={this.styles.link}
                onPress={() => Linking.openURL(link)}
              >
              Link Recommended by Teacher about {about}
              </Text>
            </Body>
          </CardItem>
        </Card>
        <Button
          onPress={() => this.onDelete(item)}
          danger
          bordered
          style={this.styles.button}
        >
          <Text style={{ color: 'white' }}>{`Uploaded ${dateUpload}`}</Text>
          <Icon
            active
            name="trash"
            style={{ color: 'white' }}
          />
        </Button>
      </View>
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
        {/* this breaks the navigation */}
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
              {`Posted Fun Stuff for class ${className}`}
            </Text>

            <Button
              iconLeft
              success
              style={this.styles.buttonAdd}
              onPress={() => this.props.navigation.navigate('FunPost')}
            >
              <Icon active name="ios-add-circle-outline" />
              <Text>      Add More Fun Stuff</Text>
            </Button>

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
      </ImageBackground>

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

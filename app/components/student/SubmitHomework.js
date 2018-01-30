import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, View, ImageBackground } from 'react-native';
import { ImagePicker } from 'expo';
import { Spinner } from 'native-base';
import { Button, Text } from 'react-native-elements';
import { SERVER_URI, PostHomework } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { blue, white, yellow, orange, red, green } from '../../style/colors';

class SubmitHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: false,
    };
    this._postHomework = this._postHomework.bind(this);
    this._pickImage = this._pickImage.bind(this);
    this._openCamera = this._openCamera.bind(this);
  }

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
    }
  };

  _openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  _postHomework() {
    this.setState({ loading: true });
    const participant = this.props.state.selectSession.participantID;
    const assignment = this.props.state.specificAssignment.id;
    const apiUrl = `${SERVER_URI}${PostHomework}/${participant}/${assignment}`;
    const uri = this.state.image;

    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options)
      .then((res) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const styles = StyleSheet.create({
      bigcontainer: {
        // had to comment this out to make header work
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    });

    const { image } = this.state;
    const className = this.props.state.selectSession.sessionName;


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
          className={className}
          back
        />
        <View style={styles.bigcontainer}>
          <Text h3 style={{ color: yellow, textAlign: 'center', marginBottom: 50 }}>
          Submit Homeworks for {className}
          </Text>

          <Button
            style={[{ marginBottom: 10, marginTop: 40 }]}
            title="Pick your homework from camera roll"
            iconRight={{ name: 'attach-file', color: 'black' }}
            backgroundColor={white}
            borderRadius={5}
            color="black"
            onPress={this._pickImage}
          />
          <Button
            buttonStyle={[{ marginBottom: 50, marginTop: 10 }]}
            title="Open Camera"
            iconRight={{ name: 'camera', color: 'black' }}
            backgroundColor={white}
            borderRadius={5}
            color="black"
            onPress={this._openCamera}
          />
          <Button
            buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
            title="Submit Homework!"
            iconRight={{ name: 'done', color: 'black' }}
            backgroundColor={white}
            borderRadius={5}
            color="black"
            onPress={this._postHomework}
          />
          <View>{this.state.loading ? <Spinner color={white} /> : null}</View>
          <Text style={{ textAlign: 'center', color: white }}>{this.state.loading ? 'Document Loading ...' : ''}</Text>
          {image &&
          <Image source={{ uri: image }} style={{ width: 250, height: 350 }} />}
        </View>
      </ImageBackground>

    );
  }
}

const mapStateToProps = state => ({
  state,
});

SubmitHomework.propTypes = {
  state: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(SubmitHomework);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Button } from 'react-native-elements';
import { SERVER_URI, PostHomework } from '../../constant';

class SubmitHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
    // console.log('Homework', this.props.state);
    this._postHomework = this._postHomework.bind(this);
    this._pickImage = this._pickImage.bind(this);
    this._openCamera = this._openCamera.bind(this);
  }

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
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
    // console.log('camera', result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  _postHomework() {
    // const participant = this.props.state.participant_id;
    // const assignment = this.props.state.assignment_id;
    const apiUrl = `${SERVER_URI}${PostHomework}`;// need to update here 
    const uri = this.state.image;
    // console.log('posturi', uri);

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

    return fetch(apiUrl, options);
  }

  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          style={[{ marginBottom: 10, marginTop: 10 }]}
          title="Pick your homework from camera roll"
          iconRight={{ name: 'attach-file' }}
          backgroundColor="blue"
          rounded
          onPress={this._pickImage}
        />
        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Open Camera"
          iconRight={{ name: 'camera' }}
          backgroundColor="blue"
          rounded
          onPress={this._openCamera}
        />
        <Button
          buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
          title="Post to Homeworks!"
          iconRight={{ name: 'done' }}
          backgroundColor="blue"
          rounded
          onPress={this._postHomework}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 250, height: 350 }} />}
      </View>
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

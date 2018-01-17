import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Button } from 'react-native-elements';
import { SERVER_URI, PostHomework } from '../../constant';

class SubmitHomework extends React.Component {
  state = {
    image: null,
  };
  postHomework = this.postHomework.bind(this);

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });

    console.log('pickImage',result.uri);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
    });
    console.log('camera',result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  postHomework() {
    const apiUrl = `${SERVER_URI}${PostHomework}`;
    const uri = this.state.image;
    // const participant = this.props.state.participant_id;
    // const assignment = this.props.state.assignment_id;
    console.log(uri);

    const uriParts = uri.split('.');
    console.log(uriParts);
    const fileType = uriParts[uriParts.length - 1];
    console.log(fileType);

    let formData = new FormData();
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options);
    // axios.post(`${SERVER_URI}${PostHomework}`, { uri, participant, assignment })
    //   .then((response) => {
    //     console.log(response.data);
    //     return response.data;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          style={[{ marginBottom: 5, marginTop: 5 }]}
          title="Pick your homework from camera roll"
          onPress={this.pickImage}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Open Camera"
          onPress={this.openCamera}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Post to Homeworks!"
          onPress={this.postHomework.bind(this)}
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
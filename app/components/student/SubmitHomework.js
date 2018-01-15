import React from 'react';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { SERVER_URI } from '../../constant';

export default class SubmitHomework extends React.Component {
  state = {
    image: null,
  };
  postHomework = this.postHomework.bind(this);

  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [4, 3],
      base64: true,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }
  postHomework() {
    const { image } = this.state;
    console.log(image);
    axios.post(`${SERVER_URI}/hello`, { image })
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          style={[{ marginBottom: 5, marginTop: 5 }]}
          title="Pick your homework from camera roll"
          onPress={this._pickImage}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Open Camera"
          onPress={this._openCamera}
        />
        <Button
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Post to Homeworks!"
          onPress={this.postHomework.bind(this)}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />}
      </View>
    );
  }
}

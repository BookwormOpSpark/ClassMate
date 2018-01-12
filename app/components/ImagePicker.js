import React from 'react';
import { Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Button } from 'react-native-elements'

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

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
        {image &&
          <Image source={{ uri: image }} style={{ width: 300, height: 400 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

    _openCamera = async () => {
      let result = await ImagePicker.launchCameraAsync({
        // allowsEditing: true,
        // aspect: [4, 3],
      });
      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }


}
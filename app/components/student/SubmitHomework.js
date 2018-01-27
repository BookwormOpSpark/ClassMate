import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Image, View } from 'react-native';
import { ImagePicker } from 'expo';
import { Spinner } from 'native-base';
import { Button, Text, Header } from 'react-native-elements';
import { SERVER_URI, PostHomework } from '../../constant';

class SubmitHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      loading: false,
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
    this.setState({ loading: true });
    const participant = this.props.state.selectSession.participantID;
    const assignment = this.props.state.specificAssignment.id;
    // console.log(participant, 'participant before APIURL');
    const apiUrl = `${SERVER_URI}${PostHomework}/${participant}/${assignment}`;// need to update here
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

    return fetch(apiUrl, options)
      .then((res) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const styles = StyleSheet.create({
      bigcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    });

    const { image } = this.state;
    const className = this.props.state.selectSession.sessionName;


    return (
      <View style={styles.bigcontainer}>
        <Text h3 style={{ color: 'blue', textAlign: 'center', marginBottom: 50 }}>
          Submit Homeworks for Class {className}
        </Text>

        <Button
          style={[{ marginBottom: 10, marginTop: 40 }]}
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
        <View>{this.state.loading ? <Spinner color="blue" /> : null}</View>
        <Text style={{ textAlign: 'center' }}>{this.state.loading ? 'Document Loading ... :)' : ''}</Text>
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

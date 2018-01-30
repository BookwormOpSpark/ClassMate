
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { DocumentPicker } from 'expo';
import { Button, Text } from 'react-native-elements';
import { Item, Input, Form, Spinner } from 'native-base';
import { SERVER_URI, PostFunStuff } from '../../constant';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { white } from '../../style/colors';


class FunPost extends React.Component {
  constructor(props) {
    super(props);
    // console.log('state Fun Post', this.props.state);
    this.state = {
      image: null,
      link: '',
      loading: false,
    };
    this.postDocument = this.postDocument.bind(this);
    this.postLink = this.postLink.bind(this);
    this.postFinal = this.postFinal.bind(this);
    this.pickDocument = this.pickDocument.bind(this);
    this.whatType = this.whatType.bind(this);
  }


  pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.cancelled) {
      this.setState({
        image: result,
      });
    }
    // console.log('result', this.state.image);
    alert(`${this.state.image.name} selected!`);
  }

  whatType = (link) => {
    const imgArr = ['gif', 'jpg', 'jpeg', 'png', 'tiff', 'tif'];
    const linkArr = link.split('.');
    let type = '';
    const youTubev1 = new RegExp('https://youtu');
    const youTubev2 = new RegExp('https://www.youtube.com');
    if (youTubev1.test(link) || youTubev2.test(link) || /youtube/.test(link) || /vimeo/.test(link)) {
      type = 'youtube';
    } else if (imgArr.includes(linkArr[linkArr.length - 1])) {
      type = 'image';
    } else if (/gph.is/.test(link)) {
      type = 'image';
    } else {
      type = 'internet';
    }
    return type;
  };

  postLink() {
    this.setState({ loading: true });
    const { link } = this.state;
    const type = this.whatType(link);
    const session = this.props.state.selectSession.sessionID || 2;
    axios.post(`${SERVER_URI}${PostFunStuff}/${session}`, { link, type })
      .then((res) => {
        this.props.navigation.navigate('Fun');
      })
      .catch(err => console.error(err));
  }

  postDocument() {
    this.setState({ loading: true });
    const session = this.props.state.selectSession.sessionID || 2;

    const apiUrl = `${SERVER_URI}${PostFunStuff}/${session}`;// need to update here
    const { name, uri } = this.state.image;
    const uriParts = name.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('document', {
      uri,
      name,
      type: `application/${fileType}`,
    });

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    return fetch(apiUrl, options).then((res) => {
      this.setState({ loading: false });
      this.props.navigation.navigate('Fun');
    })
      .catch(err => console.error(err));
  }

  postFinal() {
    this.state.link ? this.postLink() : this.postDocument();
  }

  render() {
    const styles = StyleSheet.create({
      bigcontainer: {
        flex: 1,
        justifyContent: 'flex-start',
      },
    });

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
          <Text h3 style={{ color: white, textAlign: 'center', marginBottom: 50 }}>
          Post Fun Stuff Here!
          </Text>

          <Button
            buttonStyle={[{ marginBottom: 10, marginTop: 10 }]}
            title="Pick Documents"
            color="black"
            iconRight={{ name: 'attach-file', color: 'black' }}
            backgroundColor="#f4d35e"
            borderRadius={5}
            onPress={this.pickDocument}
          />
          <Text h4 style={{ color: '#f4d35e', marginTop: 20, marginBottom: 20, alignSelf: 'center' }}> OR </Text>

          <Form>
            <Item rounded>
              <Input
                placeholder="Paste your link (youTube, gif, doc ...)"
                placeholderTextColor="#f4d35e"
                color="yellow"
                onChangeText={text => this.setState({ link: text })}
              />
            </Item>
          </Form>
          <Button
            buttonStyle={[{ marginBottom: 10, marginTop: 70 }]}
            title="Post Link or Document!"
            iconRight={{ name: 'done' }}
            backgroundColor="#5fad56"
            borderRadius={5}
            onPress={this.postFinal}
          />
          <View>{this.state.loading ? <Spinner color="blue" /> : null}</View>
          <Text style={{ textAlign: 'center', color: 'white' }}>{this.state.loading ? 'Document Loading ...' : ''}</Text>
        </View>
      </ImageBackground>


    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(FunPost);
FunPost.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

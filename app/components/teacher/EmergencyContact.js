import React from 'react';
import { StyleSheet, Alert, Linking, View, ImageBackground } from 'react-native';
// import { Text } from 'react-native-elements';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Card, CardItem, Icon } from 'native-base';
import { SERVER_URI, CreateEmergencyContact } from '../../constant';
import DashHeader from '../shared/Header';
import blackboard from '../../assets/blackboard.jpg';
import { yellow, white } from '../../style/colors';


class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: '',
      nameLast: '',
      address: '',
      phone: '',
    };
    this.callNumber = this.callNumber.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = async () => {
    // console.log('item', item);
    const emergencyContact = this.state;
    const userId = this.props.state.user.id;
    const info = { emergencyContact, userId };
    await axios.post(`${SERVER_URI}${CreateEmergencyContact}`, info)
      .then((res) => {
        Alert.alert(
          'Success!',
          'Emergency Contact has been created',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
        // this.props.dispatch(specificAssignment(res.data));
      })
      .catch(err => console.error(err));
    // this.props.navigation.navigate('SpecificAssignment');
  }

  callNumber = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        // console.log(`Can't handle url: ${url}`);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    // console.log(this.props.state.user)
    const contactInfo = this.props.state.user.emergencyContactInfo ? this.props.state.user.emergencyContactInfo[0] : { email: '' };
    let formattedPhone = contactInfo.email;
    if (formattedPhone.length) {
      const digitz = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      formattedPhone = formattedPhone.split('').filter(char => digitz.includes(char)).join('');
      formattedPhone = `(${formattedPhone.slice(0, 3)})-${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6)}`;
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      headerText: {
        color: white,
        marginTop: 10,
        fontSize: 30,
      },
      card: {
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 50,
        padding: 10,
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
      },
    });
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
          className="Contact"
          back
        />
        <View style={{ flex: 1 }}>
          <Container style={{ backgroundColor: 'transparent' }}>
            <Header style={{ backgroundColor: 'transparent' }}>
              <Text style={styles.headerText}>Emergency Contact</Text>
            </Header>
            <Content>
              {this.props.state.user.emergencyContact === null ?
                <Form style={{ justifyContent: 'center' }}>
                  <Item stackedLabel>
                    <Label style={{ color: white }}>First Name</Label>
                    <Input
                      style={{ color: white }}
                      onChangeText={text => this.setState({ nameFirst: text })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{ color: white }}>Last Name</Label>
                    <Input
                      style={{ color: white }}
                      onChangeText={text => this.setState({ nameLast: text })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{ color: white }}>Address</Label>
                    <Input
                      style={{ color: white }}
                      onChangeText={text => this.setState({ address: text })}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label style={{ color: white }}>Phone Number</Label>
                    <Input
                      style={{ color: white }}
                      onChangeText={text => this.setState({ phone: text })}
                    />
                  </Item>
                  <Button
                    block
                    success
                    onPress={() => this.onSelect()}
                  >
                    <Text>Create Contact</Text>
                  </Button>
                </Form>
                :
                <Card style={styles.card}>
                  <CardItem header>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Name : </Text>
                    <Text>{`${contactInfo.nameFirst} ${contactInfo.nameLast}`}</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Address : </Text>
                    <Text>{`${contactInfo.address}`}</Text>
                  </CardItem>
                  <CardItem>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}> Phone Number : </Text>
                    <Text
                      onPress={() => this.callNumber(`tel:1-${contactInfo.email}`)}
                      style={{ textDecorationLine: 'underline' }}
                    >{`1-${formattedPhone}`}
                    </Text>
                  </CardItem>
                </Card>
                }
            </Content>
          </Container>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(EmergencyContact);

EmergencyContact.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

import React from 'react';
import { StyleSheet, Alert, Linking, View, ImageBackground } from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, CardItem } from 'native-base';
import { SERVER_URI, CreateEmergencyContact } from '../../constant';
import DashHeader from '../shared/Header';
import blackboard from '../../assets/blackboard.jpg';
import { yellow, white, blue } from '../../style/colors';


class EmergencyContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: '',
      nameLast: '',
      address: '',
      phone: '',
      submitted: false,
    };
    this.callNumber = this.callNumber.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = async () => {
    // console.log('item', item);
    const { nameFirst, nameLast, address, phone } = this.state;
    const emergencyContact = { nameFirst, nameLast, address, phone };
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
        const digitz = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let formattedPhone = phone.split('').filter(char => digitz.includes(char)).join('');
        formattedPhone = `(${formattedPhone.slice(0, 3)})-${formattedPhone.slice(3, 6)}-${formattedPhone.slice(6)}`;
        this.setState({ submitted: true, phone: formattedPhone });
      })
      .catch(err => console.error(err));
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
      headerText: {
        color: white,
        marginTop: 10,
        fontSize: 30,
      },
      rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      categoryText: {
        width: '30%',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
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
            <Content>
              {this.state.submitted &&
                <Card title="EMERGENCY CONTACT" containerStyle={{ backgroundColor: white, borderColor: blue }} dividerStyle={{ backgroundColor: blue }} >
                  <View style={{ alignItems: 'center' }}><Icon color={blue} name="asterisk" size={25} /></View>
                  <View style={{ padding: 5 }} />
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Name :</Text>
                    <Text style={{ width: '70%', textAlign: 'right' }}>{`${this.state.nameFirst} ${this.state.nameLast}`}</Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Address :</Text>
                    <Text style={{ width: '70%', textAlign: 'right' }}>{this.state.address}</Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Phone :</Text>
                    <Text
                      style={{ width: '70%', textAlign: 'right', textDecorationLine: 'underline' }}
                      onPress={() => this.callNumber(`tel:1-${this.state.phone}`)}
                    >
                      {`1-${this.state.phone}`}
                    </Text>
                  </View>
                </Card>
              }
              {!this.state.submitted && !this.props.state.user.emergencyContact &&
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
                  <View style={{ padding: 10 }} />
                  <Button
                    block
                    success
                    onPress={() => this.onSelect()}
                  >
                    <Text>Create Contact</Text>
                  </Button>
                </Form>
              }
              {!this.state.submitted && this.props.state.user.emergencyContact &&
                <Card title="EMERGENCY CONTACT" containerStyle={{ backgroundColor: white, borderColor: blue }} dividerStyle={{ backgroundColor: blue }} >
                  <View style={{ alignItems: 'center' }}><Icon color={blue} name="asterisk" size={25} /></View>
                  <View style={{ padding: 5 }} />
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Name :</Text>
                    <Text style={{ width: '70%', textAlign: 'right' }}>{`${contactInfo.nameFirst} ${contactInfo.nameLast}`}</Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Address :</Text>
                    <Text style={{ width: '70%', textAlign: 'right' }}>{contactInfo.address}</Text>
                  </View>
                  <View style={styles.rowView}>
                    <Text style={styles.categoryText}>Phone :</Text>
                    <Text
                      style={{ width: '70%', textAlign: 'right', textDecorationLine: 'underline' }}
                      onPress={() => this.callNumber(`tel:1-${contactInfo.email}`)}
                    >
                      {`1-${formattedPhone}`}
                    </Text>
                  </View>
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

import React from 'react';
import { StyleSheet, View, ScrollView, Image, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body, Left, Right, Switch } from 'native-base';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { blue, white, yellow, orange, red, green } from '../../style/colors';
import blackboard from '../../assets/blackboard.jpg';
import { SERVER_URI, StudentInformation } from '../../constant';
import { specificStudent } from '../../actions/actions';
import DashHeader from '../shared/Header';

class ClassRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roster: this.props.state.classInfo.students,
    };
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = async (item) => {
    // console.log('item', item);
    await axios.get(`${SERVER_URI}${StudentInformation}`, {
      params: {
        id: item.id,
      },
    }).then((res) => {
      // console.log(res.data, 'res.data from axios');
      this.props.dispatch(specificStudent(res.data));
    })
      .catch(err => console.error(err));
    this.props.navigation.navigate('SpecificStudent');
  };

  render() {
    // console.log(this.props.state, 'props...state');
    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 110,
      },
      list: {
        borderRadius: 5,
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
      },
      item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      badges: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      contentContainer: {
        flexGrow: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
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
        <ScrollView>
          <Container>
            <Header style={{ backgroundColor: 'transparent' }}>
              <Text style={{ color: yellow, fontSize: 40 }}>Class Roster</Text>
            </Header>
            <Text style={{ color: yellow, fontSize: 20, textAlign: 'center', paddingVertical: 20, backgroundColor: 'transparent' }}>Click a student to see detailed information.</Text>
            <Content>
              <List>
                {this.state.roster && this.state.roster.length > 0 ?
                  this.state.roster.map((student, id) => (
                    <ListItem
                      icon
                      style={{ }}
                      key={id}
                      onPress={() => this.onSelect(student)}
                    >
                      <Left>
                        <Icon style={{ color: white }} name="logo-octocat" />
                      </Left>
                      <Body>
                        <Text style={{ color: white, fontSize: 20 }}>{`${student.nameFirst} ${student.nameLast}`}</Text>
                      </Body>
                      <Right>
                        <Icon style={{ color: white, fontSize: 15 }} name="ios-arrow-dropright" />
                      </Right>
                    </ListItem>
                  ))
              : null}
              </List>
            </Content>
          </Container>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(ClassRoster);

ClassRoster.propTypes = {
  navigation: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

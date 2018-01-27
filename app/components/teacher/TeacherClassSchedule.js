import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
} from 'native-base';

class TeacherClassSchedule extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Icon Buttons</Title>
          </Body>
          <Right />
        </Header>

        <Content padder style={{ padding: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Button iconLeft light>
              <Icon active name="arrow-back" />
              <Text>Back</Text>
            </Button>
            <Button light iconRight>
              <Text>Next</Text>
              <Icon active name="arrow-forward" />
            </Button>
            <Button light>
              <Icon active name="arrow-down" />
            </Button>
            <Button light>
              <Icon active name="arrow-up" />
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button
              iconLeft
              bordered
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="briefcase" />
              <Text>Work</Text>
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft success>
              <Icon active name="people" />
              <Text>People</Text>
            </Button>
            <Button
              iconLeft
              success
              bordered
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="paw" />
              <Text>Animals</Text>
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft danger>
              <Icon active name="close" />
              <Text>Trash</Text>
            </Button>
            <Button
              danger
              bordered
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="trash" />
            </Button>
            <Button
              danger
              transparent
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="trash" />
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft warning>
              <Icon active name="warning" />
              <Text>Dont</Text>
            </Button>
            <Button
              warning
              bordered
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="warning" />
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft info>
              <Icon name="alert" />
              <Text>Help</Text>
            </Button>
            <Button info style={{ marginBottom: 20, marginLeft: 10 }}>
              <Icon name="alert" />
            </Button>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Button iconLeft dark>
              <Icon active name="cog" />
              <Text>Settings</Text>
            </Button>
            <Button
              dark
              transparent
              style={{ marginBottom: 20, marginLeft: 10 }}
            >
              <Icon active name="cog" />
            </Button>
          </View>
          <Button iconLeft transparent>
            <Icon active name="beer" />
            <Text>Pub</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default TeacherClassSchedule;

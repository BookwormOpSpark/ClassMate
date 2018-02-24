import React from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
// import RNPrint from 'react-native-print';
import blackboard from '../../assets/blackboard.jpg';
import DashHeader from '../shared/Header';
import { white, yellow } from '../../style/colors';

class QRcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      selectedPrinter: '',
    };
  }

  // selectPrinter = async () => {
  //   const selectedPrinter = await RNPrint.selectPrinter();
  //   this.setState({ selectedPrinter });
  // }

  // printHTML = async () => {
  //   const selectedPrinter = await RNPrint.selectPrinter();
  //   this.setState({ selectedPrinter });
  //   await RNPrint.print({
  //     html: '<QRCode value={`${this.props.state.selectSession.sessionID}`} size={250} bgColor="black" fgColor="white" />'
  //   });
  // }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
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
        <View style={styles.container}>
          <Text style={{ color: white }}> Have students scan this code to join the class!</Text>
          <View style={{ padding: 20 }} />
          <QRCode
            value={`${this.props.state.selectSession.sessionID}`}
            size={250}
            bgColor="black"
            fgColor="white"
          />
          <Button
            buttonStyle={[{ marginBottom: 10, marginTop: 40 }]}
            // onPress={() => this.printHTML()}
            backgroundColor={yellow}
            color="black"
            rounded
            title="print code"
          />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

export default connect(mapStateToProps)(QRcode);

QRcode.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};


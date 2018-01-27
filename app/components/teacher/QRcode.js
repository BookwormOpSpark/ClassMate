import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import PropTypes from 'prop-types';

class QRcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }
  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <QRCode
          value={`${this.props.state.selectSession.sessionID}`}
          size={150}
          bgColor="blue"
          fgColor="white"
        />
      </View>
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


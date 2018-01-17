import { connect } from 'react-redux';
import { getSession } from '../actions/actions';
import JoinClass from '../components/student/JoinClass';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onJoiningClass: (code) => {
    dispatch(getSession(code));
  },
});

const JoinClassContainer = connect(mapStateToProps, mapDispatchToProps)(JoinClass);

export default JoinClassContainer;

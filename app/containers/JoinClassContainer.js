import { connect } from 'react-redux';
import { getSession, getDashboard } from '../actions/actions';
import JoinClass from '../components/student/JoinClass';

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  onJoiningClass: (code) => {
    dispatch(getSession(code));
  },
  onDashboard: (id) => {
    dispatch(getDashboard(id));
  },
});

const JoinClassContainer = connect(mapStateToProps, mapDispatchToProps)(JoinClass);

export default JoinClassContainer;

import { StackNavigator } from 'react-navigation';
import StudentClassDashboard from '../components/student/StudentClassDashboard';
import RaiseHand from '../components/student/RaiseHand';
import SubmitHomework from '../components/student/SubmitHomework';
import Fun from '../components/student/Fun';
import CheckIn from '../components/student/CheckIn';
import Assignment from '../components/student/Assignment';
import StudentBadges from '../components/student/StudentBadges';
import StudentBadges3D from '../components/student/StudentBadges3D';

const StudentClassNavigation = StackNavigator({
  StudentClassDashboard: {
    screen: StudentClassDashboard,
    navigationOptions: () => ({
      header: null,
    }),
  },
  RaiseHand: {
    screen: RaiseHand,
    navigationOptions: () => ({
      header: null,
    }),
  },
  CheckIn: {
    screen: CheckIn,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Assignment: {
    screen: Assignment,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SubmitHomework: {
    screen: SubmitHomework,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentBadges: {
    screen: StudentBadges,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentBadges3D: {
    screen: StudentBadges3D,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Fun: {
    screen: Fun,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default StudentClassNavigation;

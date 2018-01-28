import { StackNavigator } from 'react-navigation';
import StudentClassDashboard from '../components/student/StudentClassDashboard';
import RaiseHand from '../components/student/RaiseHand';
import SubmitHomework from '../components/student/SubmitHomework';
import StudentBadges from '../components/student/StudentBadges';
import Fun from '../components/student/Fun';
import CheckIn from '../components/student/CheckIn';
import Assignment from '../components/student/Assignment';

const StudentClassNavigation = StackNavigator({
  Home: {
    screen: StudentClassDashboard,
  },
  RaiseHand: {
    screen: RaiseHand,
  },
  CheckIn: {
    screen: CheckIn,
  },
  StudentClassDashboard: {
    screen: StudentClassDashboard,
  },
  Assignment: {
    screen: Assignment,
  },
  SubmitHomework: {
    screen: SubmitHomework,
  },
  StudentBadges: {
    screen: StudentBadges,
  },
  Fun: {
    screen: Fun,
  },
});

export default StudentClassNavigation;

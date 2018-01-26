import { StackNavigator } from 'react-navigation';
import StudentClassDashboard from '../components/student/StudentClassDashboard';
import RaiseHand from '../components/student/RaiseHand';
import SubmitHomework from '../components/student/SubmitHomework';
import StudentClassSchedule from '../components/student/StudentClassSchedule';
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
  StudentClassSchedule: {
    screen: StudentClassSchedule,
  },
  Fun: {
    screen: Fun,
  },
});

export default StudentClassNavigation;

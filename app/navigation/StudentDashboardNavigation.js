import { StackNavigator } from 'react-navigation';
import StudentDashboard from '../components/student/StudentDashboard';
import CheckIn from '../components/student/CheckIn';
import EmergencyContact from '../components/student/EmergencyContact';
import JoinClassContainer from '../containers/JoinClassContainer';

const StudentDashboardNavigation = StackNavigator({
  Home: {
    screen: StudentDashboard,
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
  EmergencyContact: {
    screen: EmergencyContact,
    navigationOptions: () => ({
      header: null,
    }),
  },
  JoinClass: {
    screen: JoinClassContainer,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
});

export default StudentDashboardNavigation;

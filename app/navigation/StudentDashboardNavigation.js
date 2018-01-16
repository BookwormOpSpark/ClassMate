import { StackNavigator } from 'react-navigation';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentClassNavigation from './StudentClassNavigation';
import JoinClass from '../components/student/JoinClass';

const StudentDashboardNavigation = StackNavigator({
  Home: {
    screen: StudentDashboard,
  },
  JoinClass: {
    screen: JoinClass,
  },
  StudentClassNavigation: {
    screen: StudentClassNavigation,
    // Only current solution to avoid double stacking
    navigationOptions: () => ({
      header: null,
    }),
  },

});

export default StudentDashboardNavigation;

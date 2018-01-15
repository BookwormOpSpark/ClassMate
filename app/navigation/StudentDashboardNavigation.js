import { StackNavigator } from 'react-navigation';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentClassNavigation from './StudentClassNavigation';

const StudentDashboardNavigation = StackNavigator({
  Home: {
    screen: StudentDashboard,
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

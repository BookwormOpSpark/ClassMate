import { StackNavigator } from 'react-navigation';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentClassNavigation from './StudentClassNavigation';
// import JoinClass from '../components/student/JoinClass';
import JoinClassContainer from '../containers/JoinClassContainer';

const StudentDashboardNavigation = StackNavigator({
  Home: {
    screen: StudentDashboard,
  },
  JoinClass: {
    screen: JoinClassContainer,
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

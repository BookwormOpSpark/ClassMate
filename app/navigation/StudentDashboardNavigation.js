import { StackNavigator } from 'react-navigation';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentClassNavigation from './StudentClassNavigation';
import FirstPage from '../components/FirstPage';
// import JoinClass from '../components/student/JoinClass';
import JoinClassContainer from '../containers/JoinClassContainer';

const StudentDashboardNavigation = StackNavigator({
  Home: {
    screen: StudentDashboard,
  },
  JoinClass: {
    screen: JoinClassContainer,
  },
  FirstPage: {
    screen: FirstPage,
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

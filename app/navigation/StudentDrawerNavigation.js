import { DrawerNavigator } from 'react-navigation';
import StudentDashboardNavigation from './StudentDashboardNavigation';
import StudentClassNavigation from './StudentClassNavigation';
import StudentDrawer from '../components/student/StudentDrawer';
import JoinClassContainer from '../containers/JoinClassContainer';
import CheckIn from '../components/student/CheckIn';
// import EmergencyContact from '../components/teacher/EmergencyContact';

const StudentDrawerNavigator = DrawerNavigator({
  StudentDashboardNavigation: {
    screen: StudentDashboardNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentClassNavigation: {
    screen: StudentClassNavigation,
  },
  JoinClass: {
    screen: JoinClassContainer,
  },
  CheckIn: {
    screen: CheckIn,
  },
}, {
  contentComponent: StudentDrawer,
  drawerWidth: 200,
});

export default StudentDrawerNavigator;

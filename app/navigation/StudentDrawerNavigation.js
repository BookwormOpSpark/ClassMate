import { DrawerNavigator } from 'react-navigation';
import StudentDashboardNavigation from './StudentDashboardNavigation';
import StudentClassNavigation from './StudentClassNavigation';
import StudentDrawer from '../components/student/StudentDrawer';
import JoinClassContainer from '../containers/JoinClassContainer';

const StudentDrawerNavigator = DrawerNavigator({
  StudentDashboardNavigation: {
    screen: StudentDashboardNavigation,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  StudentClassNavigation: {
    screen: StudentClassNavigation,
    navigationOptions: () => ({
      drawerLockMode: 'locked-closed',
    }),
  },
  JoinClass: {
    screen: JoinClassContainer,
    navigationOptions: () => ({
      drawerLockMode: 'locked-closed',
    }),
  },
}, {
  contentComponent: StudentDrawer,
  drawerWidth: 200,
});

export default StudentDrawerNavigator;

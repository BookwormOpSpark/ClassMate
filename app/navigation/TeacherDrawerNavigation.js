import { DrawerNavigator } from 'react-navigation';
import TeacherDashboardNavigation from './TeacherDashboardNavigation';
import TeacherClassNavigation from './TeacherClassNavigation';
import TeacherDrawer from '../components/teacher/TeacherDrawer';
import AddClass from '../components/teacher/AddClass';
import EmergencyContact from '../components/teacher/EmergencyContact';

const TeacherDrawerNavigator = DrawerNavigator({
  TeacherDashboardNavigation: {
    screen: TeacherDashboardNavigation,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  TeacherClassNavigation: {
    screen: TeacherClassNavigation,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  AddClass: {
    screen: AddClass,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  EmergencyContact: {
    screen: EmergencyContact,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
}, {
  contentComponent: TeacherDrawer,
  drawerWidth: 200,
});

export default TeacherDrawerNavigator;


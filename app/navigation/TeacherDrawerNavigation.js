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
    }),
  },
  TeacherClassNavigation: {
    screen: TeacherClassNavigation,
  },
  AddClass: {
    screen: AddClass,
  },
  EmergencyContact: {
    screen: EmergencyContact,
  },
}, {
  contentComponent: TeacherDrawer,
  drawerWidth: 200,
});

export default TeacherDrawerNavigator;


import { DrawerNavigator } from 'react-navigation';
import TeacherDashboardNavigation from './TeacherDashboardNavigation';
import TeacherClassNavigation from './TeacherClassNavigation';
import TeacherDrawer from '../components/teacher/TeacherDrawer';
import AddClass from '../components/teacher/AddClass';

const TeacherDrawerNavigator = DrawerNavigator({
  TeacherDashboardNavigation: {
    screen: TeacherDashboardNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherClassNavigation: {
    screen: TeacherClassNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  AddClass: {
    screen: AddClass,
    navigationOptions: () => ({
      header: null,
    }),
  },
}, {
  contentComponent: TeacherDrawer,
  drawerWidth: 200,
});

export default TeacherDrawerNavigator;


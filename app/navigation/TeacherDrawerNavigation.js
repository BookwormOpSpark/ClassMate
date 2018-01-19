import { DrawerNavigator } from 'react-navigation';
import TeacherDashboardNavigation from './TeacherDashboardNavigation';
import TeacherClassNavigation from './TeacherClassNavigation';
import TeacherDrawer from '../components/teacher/TeacherDrawer';


const TeacherDrawerNavigator = DrawerNavigator({
  TeacherDashboardNavigation: {
    screen: TeacherDashboardNavigation,
  },
  TeacherClassNavigation: {
    screen: TeacherClassNavigation,
  },
}, {
  contentComponent: TeacherDrawer,
  drawerWidth: 200,
});

export default TeacherDrawerNavigator;


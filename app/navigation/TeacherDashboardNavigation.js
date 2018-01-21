import { StackNavigator } from 'react-navigation';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
// import TeacherClassNavigation from './TeacherClassNavigation';
// import FirstPage from '../components/FirstPage';
// import AddClass from '../components/teacher/AddClass';

const TeacherDashboardNavigation = StackNavigator({
  Home: {
    screen: TeacherDashboard,
  },
  // AddClass: {
  //   screen: AddClass,
  // },
  // FirstPage: {
  //   screen: FirstPage,
  // },
  // TeacherClassNavigation: {
  //   screen: TeacherClassNavigation,
  //   // Only current solution to avoid double stacking
  //   navigationOptions: () => ({
  //     header: null,
  //   }),
  // },

});

export default TeacherDashboardNavigation;

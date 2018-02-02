import { StackNavigator } from 'react-navigation';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
// import AddClass from '../components/teacher/AddClass';

const TeacherDashboardNavigation = StackNavigator({
  Home: {
    screen: TeacherDashboard,
    navigationOptions: () => ({
      header: null,
    }),
  },
  // AddClass: {
  //   screen: AddClass,
  // },
});

export default TeacherDashboardNavigation;

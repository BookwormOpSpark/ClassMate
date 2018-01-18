import { StackNavigator } from 'react-navigation';
import StudentLogin from '../components/student/StudentLogin';
import TeacherLogin from '../components/teacher/TeacherLogin';
import FirstPage from '../components/FirstPage';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import StudentDashboard from '../components/student/StudentDashboard';
import StudentDashboardNavigation from './StudentDashboardNavigation';
import TeacherDashboardNavigation from './TeacherDashboardNavigation';


const LoginNavigation = StackNavigator({
  Home: {
    screen: FirstPage,
  },
  StudentLogin: {
    screen: StudentLogin,
  },
  TeacherLogin: {
    screen: TeacherLogin,
  },
  // TeacherDashboard: {
  //   screen: TeacherDashboard,
  // },
  // StudentDashboard: {
  //   screen: StudentDashboard,
  // },
  StudentDashboardNavigation: {
    screen: StudentDashboardNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherDashboardNavigation: {
    screen: TeacherDashboardNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default LoginNavigation;

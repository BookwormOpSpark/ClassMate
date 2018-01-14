import { StackNavigator } from 'react-navigation';
import StudentLogin from '../components/StudentLogin';
import TeacherLogin from '../components/TeacherLogin';
import FirstPage from '../components/FirstPage';
import TeacherDashboard from '../components/TeacherDashboard';
import StudentDashboard from '../components/StudentDashboard';

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
  TeacherDashboard: {
    screen: TeacherDashboard,
  },
  StudentDashboard: {
    screen: StudentDashboard,
  },
});

export default LoginNavigation;

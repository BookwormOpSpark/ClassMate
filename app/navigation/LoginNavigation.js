import { StackNavigator } from 'react-navigation';
import StudentLogin from '../components/student/StudentLogin';
import TeacherLogin from '../components/teacher/TeacherLogin';
import FirstPage from '../components/FirstPage';
import TeacherDashboard from '../components/teacher/TeacherDashboard';
import StudentDashboard from '../components/student/StudentDashboard';
import RaiseHand from '../components/student/RaiseHand';
import SubmitHomework from '../components/student/SubmitHomework';
import StudentClassSchedule from '../components/student/StudentClassSchedule';
import StudentClassDashboard from '../components/student/StudentClassDashboard';

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
  RaiseHand: {
    screen: RaiseHand,
  },
  StudentClassDashboard: {
    screen: StudentClassDashboard,
  },
  StudentClassSchedule: {
    screen: StudentClassSchedule,
  },
  SubmitHomework: {
    screen: SubmitHomework,
  },
});

export default LoginNavigation;

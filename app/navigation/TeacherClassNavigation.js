import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import ClassRoster from '../components/teacher/ClassRoster';
import Queue from '../components/teacher/Queue';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import GiveAQuizz from '../components/teacher/GiveAQuizz';
import AssignmentNavigation from './AssignmentNavigation';

const TeacherClassNavigation = StackNavigator({
  Home: {
    screen: TeacherClassDashboard,
  },
  AssignmentNavigation: {
    screen: AssignmentNavigation,
    // Only current solution to avoid double stacking
    navigationOptions: () => ({
      header: null,
    }),
  },
  Queue: {
    screen: Queue,
  },
  TeacherClassDashboard: {
    screen: TeacherClassDashboard,
  },
  GiveAQuizz: {
    screen: GiveAQuizz,
  },
  TeacherClassSchedule: {
    screen: TeacherClassSchedule,
  },
});

export default TeacherClassNavigation;

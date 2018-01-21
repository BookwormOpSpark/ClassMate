import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import AssignmentNavigation from './AssignmentNavigation';
import ClassRoster from '../components/teacher/ClassRoster';
import Queue from '../components/teacher/Queue';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import GiveAQuizz from '../components/teacher/GiveAQuizz';
import RosterNavigation from './RosterNavigation';

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
  RosterNavigation: {
    screen: RosterNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherClassSchedule: {
    screen: TeacherClassSchedule,
  },
});

export default TeacherClassNavigation;

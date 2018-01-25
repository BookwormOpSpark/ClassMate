import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import AssignmentNavigation from './AssignmentNavigation';
import ClassRoster from '../components/teacher/ClassRoster';
import Queue from '../components/teacher/Queue';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import GiveAQuizz from '../components/teacher/GiveAQuizz';
import FunPost from '../components/teacher/FunPost';
import RosterNavigation from './RosterNavigation';
import TeacherFunNavigation from './TeacherFunNavigation';

const TeacherClassNavigation = StackNavigator({
  Home: {
    screen: TeacherClassDashboard,
  },
  AssignmentNavigation: {
    screen: AssignmentNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  TeacherFunNavigation: {
    screen: TeacherFunNavigation,
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
  FunPost: {
    screen: FunPost,
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

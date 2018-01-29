import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import SpecificAssignment from '../components/teacher/SpecificAssignment';
import Queue from '../components/teacher/Queue';
import QRcode from '../components/teacher/QRcode';
import ClassRoster from '../components/teacher/ClassRoster';
import SpecificStudent from '../components/teacher/SpecificStudent';
import ClassBadges from '../components/teacher/ClassBadges';
import CreateAssignment from '../components/teacher/CreateAssignment';
// import CurrentPostedFunNavigation from './CurrentPostedFunNavigation';
import CurrentPostedFun from '../components/teacher/CurrentPostedFun';
import FunPost from '../components/teacher/FunPost';
import Fun from '../components/student/Fun';

const TeacherClassNavigation = StackNavigator({
  // Home: {
  //   screen: TeacherClassDashboard,
  // },
  TeacherClassDashboard: {
    screen: TeacherClassDashboard,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Assignment: {
    screen: Assignment,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SpecificAssignment: {
    screen: SpecificAssignment,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Queue: {
    screen: Queue,
    navigationOptions: () => ({
      header: null,
    }),
  },
  CurrentPostedFun: {
    screen: CurrentPostedFun,
    navigationOptions: () => ({
      header: null,
    }),
  },
  FunPost: {
    screen: FunPost,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Fun: {
    screen: Fun,
    navigationOptions: () => ({
      header: null,
    }),
  },
  CreateAssignment: {
    screen: CreateAssignment,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ClassRoster: {
    screen: ClassRoster,
    navigationOptions: () => ({
      header: null,
    }),
  },
  QRcode: {
    screen: QRcode,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SpecificStudent: {
    screen: SpecificStudent,
    navigationOptions: () => ({
      header: null,
    }),
  },
  ClassBadges: {
    screen: ClassBadges,
  },
  TeacherClassSchedule: {
    screen: TeacherClassSchedule,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default TeacherClassNavigation;

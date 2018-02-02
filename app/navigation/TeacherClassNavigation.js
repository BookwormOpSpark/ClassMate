import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import SpecificAssignment from '../components/teacher/SpecificAssignment';
import Queue from '../components/teacher/Queue';
import QRcode from '../components/teacher/QRcode';
import ClassRoster from '../components/teacher/ClassRoster';
import SpecificStudent from '../components/teacher/SpecificStudent';
import CreateAssignment from '../components/teacher/CreateAssignment';
import CurrentPostedFun from '../components/teacher/CurrentPostedFun';
import FunPost from '../components/teacher/FunPost';
import Fun from '../components/student/Fun';
import BadgeGrade from '../components/teacher/BadgeGrade';
import BadgeParticipation from '../components/teacher/BadgeParticipation';
import BadgeTime from '../components/teacher/BadgeTime';
import BadgeSpirit from '../components/teacher/BadgeSpirit';
import ClassBadges from '../components/teacher/ClassBadges';

const TeacherClassNavigation = StackNavigator({

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
    navigationOptions: () => ({
      header: null,
    }),
  },
  BadgeGrade: {
    screen: BadgeGrade,
    navigationOptions: () => ({
      header: null,
    }),
  },
  BadgeTime: {
    screen: BadgeTime,
    navigationOptions: () => ({
      header: null,
    }),
  },
  BadgeSpirit: {
    screen: BadgeSpirit,
    navigationOptions: () => ({
      header: null,
    }),
  },
  BadgeParticipation: {
    screen: BadgeParticipation,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default TeacherClassNavigation;

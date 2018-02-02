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
      drawerLockMode: 'locked-closed',
    }),
  },
  SpecificAssignment: {
    screen: SpecificAssignment,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  Queue: {
    screen: Queue,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  CurrentPostedFun: {
    screen: CurrentPostedFun,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  FunPost: {
    screen: FunPost,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  Fun: {
    screen: Fun,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  CreateAssignment: {
    screen: CreateAssignment,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  ClassRoster: {
    screen: ClassRoster,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  QRcode: {
    screen: QRcode,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  SpecificStudent: {
    screen: SpecificStudent,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  ClassBadges: {
    screen: ClassBadges,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  BadgeGrade: {
    screen: BadgeGrade,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  BadgeTime: {
    screen: BadgeTime,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  BadgeSpirit: {
    screen: BadgeSpirit,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
  BadgeParticipation: {
    screen: BadgeParticipation,
    navigationOptions: () => ({
      header: null,
      drawerLockMode: 'locked-closed',
    }),
  },
});

export default TeacherClassNavigation;

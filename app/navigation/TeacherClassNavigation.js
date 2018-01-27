import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import SpecificAssignment from '../components/teacher/SpecificAssignment';
import Queue from '../components/teacher/Queue';
import QRcode from '../components/teacher/QRcode';
import ClassRoster from '../components/teacher/ClassRoster';
import SpecificStudent from '../components/teacher/SpecificStudent';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import CurrentPostedFunNavigation from './CurrentPostedFunNavigation';

const TeacherClassNavigation = StackNavigator({
  // Home: {
  //   screen: TeacherClassDashboard,
  // },
  TeacherClassDashboard: {
    screen: TeacherClassDashboard,
  },
  Assignment: {
    screen: Assignment,
  },
  SpecificAssignment: {
    screen: SpecificAssignment,
  },
  Queue: {
    screen: Queue,
  },
  CurrentPostedFunNavigation: {
    screen: CurrentPostedFunNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
  QRcode: {
    screen: QRcode,
  },
  ClassRoster: {
    screen: ClassRoster,
  },
  SpecificStudent: {
    screen: SpecificStudent,
  },
  TeacherClassSchedule: {
    screen: TeacherClassSchedule,
  },
});

export default TeacherClassNavigation;

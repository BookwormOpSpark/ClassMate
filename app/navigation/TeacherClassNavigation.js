import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import SpecificAssignment from '../components/teacher/SpecificAssignment';
import Queue from '../components/teacher/Queue';
import QRcode from '../components/teacher/QRcode';
import ClassRoster from '../components/teacher/ClassRoster';
import SpecificStudent from '../components/teacher/SpecificStudent';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import FunPost from '../components/teacher/FunPost';
import CreateAssignment from '../components/teacher/CreateAssignment';

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
  CreateAssignment: {
    screen: CreateAssignment,
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

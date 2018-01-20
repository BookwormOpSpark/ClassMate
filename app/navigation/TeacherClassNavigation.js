import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import ClassRoster from '../components/teacher/ClassRoster';
import Queue from '../components/teacher/Queue';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import GiveAQuizz from '../components/teacher/GiveAQuizz';
import RosterNavigation from './RosterNavigation';

const TeacherClassNavigation = StackNavigator({
  Home: {
    screen: TeacherClassDashboard,
  },
  Assignment: {
    screen: Assignment,
  },
  Queue: {
    screen: Queue,
  },
  TeacherClassDashboard: {
    screen: TeacherClassDashboard,
  },
  GiveAQuizz: {
    screen: RosterNavigation,
  },
  TeacherClassSchedule: {
    screen: TeacherClassSchedule,
  },
});

export default TeacherClassNavigation;

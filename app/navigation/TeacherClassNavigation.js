import { StackNavigator } from 'react-navigation';
import TeacherClassDashboard from '../components/teacher/TeacherClassDashboard';
import Assignment from '../components/teacher/Assignment';
import ClassRoster from '../components/teacher/ClassRoster';
import TeacherClassSchedule from '../components/teacher/TeacherClassSchedule';
import GiveAQuizz from '../components/teacher/GiveAQuizz';

const TeacherClassNavigation = StackNavigator({
  Home: {
    screen: TeacherClassDashboard,
  },
  Assignment: {
    screen: Assignment,
  },
  ClassRoster: {
    screen: ClassRoster,
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

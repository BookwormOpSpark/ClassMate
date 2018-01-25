import { StackNavigator } from 'react-navigation';
import FunPost from '../components/teacher/FunPost';
import Fun from '../components/student/Fun';

const TeacherFunNavigation = StackNavigator({
  Home: {
    screen: FunPost,
  },
  Fun: {
    screen: Fun,
  },
});

export default TeacherFunNavigation;

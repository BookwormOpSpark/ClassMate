import { StackNavigator } from 'react-navigation';
import FunPost from '../components/teacher/FunPost';
import Fun from '../components/student/Fun';

const TeacherFunNavigation = StackNavigator({
  Home: {
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
});

export default TeacherFunNavigation;

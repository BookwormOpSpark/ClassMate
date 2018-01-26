import { StackNavigator } from 'react-navigation';
import CurrentPostedFun from '../components/teacher/CurrentPostedFun';
import FunPost from '../components/teacher/FunPost';

const CurrentPostedFunNavigation = StackNavigator({
  Home: {
    screen: CurrentPostedFun,
  },
  FunPost: {
    screen: FunPost,
  },
});

export default CurrentPostedFunNavigation;

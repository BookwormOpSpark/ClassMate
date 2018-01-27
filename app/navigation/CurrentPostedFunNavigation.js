import { StackNavigator } from 'react-navigation';
import CurrentPostedFun from '../components/teacher/CurrentPostedFun';
import TeacherFunNavigation from './TeacherFunNavigation';

const CurrentPostedFunNavigation = StackNavigator({
  Home: {
    screen: CurrentPostedFun,
  },
  TeacherFunNavigation: {
    screen: TeacherFunNavigation,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default CurrentPostedFunNavigation;

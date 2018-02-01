import { StackNavigator } from 'react-navigation';
import BadgeGrade from '../components/teacher/BadgeGrade';
import BadgePunctuality from '../components/teacher/BadgePunctuality';
import BadgeTime from '../components/teacher/BadgeTime';
import BadgeSpirit from '../components/teacher/BadgeSpirit';
import ClassBadges from '../components/teacher/ClassBadges';

const ClassBadgesNavigation = StackNavigator({
  Home: {
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
  BadgePunctuality: {
    screen: BadgePunctuality,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default ClassBadgesNavigation;

import { StackNavigator } from 'react-navigation';
import BadgeGrade from '../components/teacher/BadgeGrade';
import BadgeBehavior from '../components/teacher/BadgeBehavior';
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
  },
  BadgeTime: {
    screen: BadgeTime,
  },
  BadgeSpirit: {
    screen: BadgeSpirit,
  },
  BadgeBehavior: {
    screen: BadgeBehavior,
  },
});

export default ClassBadgesNavigation;

import { StackNavigator } from 'react-navigation';
import ClassRoster from '../components/teacher/ClassRoster';
import SpecificStudent from '../components/teacher/SpecificStudent';

const RosterNavigation = StackNavigator({
  Home: {
    screen: ClassRoster,
  },
  SpecificStudent: {
    screen: SpecificStudent,
  },
});

export default RosterNavigation;

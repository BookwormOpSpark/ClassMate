import { StackNavigator } from 'react-navigation';
import StudentBadges from '../components/student/StudentBadges';
import StudentBadges3D from '../components/student/StudentBadges3D';


const StudentBadgesNavigation = StackNavigator({
  Home: {
    screen: StudentBadges,
    navigationOptions: () => ({
      header: null,
    }),
  },
  StudentBadges3D: {
    screen: StudentBadges3D,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

export default StudentBadgesNavigation;

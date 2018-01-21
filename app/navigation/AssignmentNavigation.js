import { StackNavigator } from 'react-navigation';
import Assignment from '../components/teacher/Assignment';
import SpecificAssignment from '../components/teacher/SpecificAssignment';

const AssignmentNavigation = StackNavigator({
  Home: {
    screen: Assignment,
  },
  SpecificAssignment: {
    screen: SpecificAssignment,
  },
});

export default AssignmentNavigation;

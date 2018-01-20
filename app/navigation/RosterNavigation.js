import { StackNavigator } from 'react-navigation';
import GiveAQuizz from '../components/teacher/GiveAQuizz'
import SpecificStudent from '../components/teacher/SpecificStudent'

const RosterNavigation = StackNavigator({
    Home: {
        screen: GiveAQuizz,
    },
    SpecificStudent: {
        screen: SpecificStudent,
    },
});

export default RosterNavigation;

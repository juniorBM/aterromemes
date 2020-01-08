import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LoginPage from './pages/auth/LoginPage';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginPage,
        navigationOptions: () => ({
            // headerTransparent: true,
            title: 'Aterro memes'
        })
    },

    // SerieForm: {
    //   screen: SerieFormScreen,
    //   navigationOptions: ({ navigation }) => {
    //     if (navigation.state.params && navigation.state.params.serieToEdit) {
    //       return { title: navigation.state.params.serieToEdit.title }
    //     }
    //     return { title: 'Nova Série' };
    //   },
    // },

}, {
    defaultNavigationOptions: {
        title: 'Aterro Memes',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#9C27B0'
        },
        headerTitleStyle: {
            color: '#FFF',
        }
    }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
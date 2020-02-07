import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import TermsPage from './pages/auth/TermsPage';
import FeedListPage from './pages/feed/FeedListPage';
import FeedCreatePage from './pages/feed/FeedCreatePage';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import React from 'react';

const AppNavigator = createStackNavigator({
    Login: {
        screen: LoginPage,
        navigationOptions: ({ navigation }) => ({
            // headerTransparent: true,
            title: 'Aterro memes',
            headerRight: () => (
                <View style={styles.cadastrar}>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
                        <Text style={styles.cadastrarText}>cadastrar</Text>
                    </TouchableOpacity>
                </View>
            ),
        })
    },
    RegisterUser: {
        screen: RegisterPage,
        navigationOptions: () => ({
            title: 'Aterro memes',
        })
    },
    TermsPage: {
        screen: TermsPage
    },
    FeedListPage: {
        screen: FeedListPage,
    },
    FeedCreatePage: {
        screen: FeedCreatePage,
    }

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
        },

    }
});

const styles = StyleSheet.create({
    cadastrarText: {
        color: 'white',
        textTransform: 'uppercase',
        padding: 15
    }
})
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
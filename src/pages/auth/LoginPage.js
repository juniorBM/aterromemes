import React from 'react';
import {
    View, TextInput, Text, StyleSheet,
    TouchableNativeFeedback, AsyncStorage, Alert
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation'
import FormRow from '../../components/FormRow';
import Message from '../../components/Message';
import Overlay from '../../components/Overlay';
import Validate from '../../utils/validatorFields';
import { connect } from 'react-redux'
import { login, checkLogin } from '../../actions';

import { PURPLE_500, PURPLE_300, PURPLE_50, RED_500 } from '../../utils/colors';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: '',
            errorEmail: '',
            errorPassword: '',
            isLoadingPage: true
        };

        this.validations = {
            'email':
            {
                'rules': ['required', 'email'],
                'value': '',
                'messageRequired': 'E-mail é obrigatório.',
                'messageEmail': 'Informe um e-mail válido.'
            },
            'password':
            {
                'rules': ['required', 'minLength'],
                'rules_value': { 'minLength': 6 },
                'value': '',
                'messageRequired': 'Senha é obrigatório.',
                'messageMinLength': 'Senha deve ter no mínimo 6 caracteres.'
            }
        }

    }

    onChangeHandler(field, value, validations = null) {

        this.setState({
            [field]: value,
        });
    }

    async componentDidMount() {
        var user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        
        if (user) {
            console.log(user.id, user.api_token);
            this.props.checkLogin({user_id: user.id, api_token: user.api_token})
                .then((data) => {
                    this.props.navigation.replace('FeedListPage');
                }).catch(async (err) => {
                    await AsyncStorage.removeItem('user');
                    this.setState({
                        isLoadingPage: false
                    });
                });

        } else {
            this.setState({
                isLoadingPage: false
            });

        }
    }

    login() {
        const { email, password } = this.state;
        this.setState({
            isLoading: true,
        });

        this.validations['email'].value = email;
        this.validations['password'].value = password;

        const nameFields = ['email', 'password'];

        const validated = Validate(nameFields, this.validations);

        if (Object.keys(validated).length > 0) {
            this.setState(
                {
                    errorEmail: validated['errorEmail'],
                    errorPassword: validated['errorPassword'],
                    isLoading: false
                }
            )

        } else {
            this.props.login({ email, password })
                .then((data) => {

                    if (data.data.status == 'success') {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'FeedListPage' })],
                        });

                        return this.props.navigation.dispatch(resetAction);
                    }



                }).catch((err) => {
                    const { data } = err.response;
                    console.log(err.response);
                    this.setState(
                        {
                            isLoading: false
                        }
                    );
                    if (data.status == 'error') {
                        return new Promise((resolve, reject) => {
                            Alert.alert(
                                'Erro ao fazer login',
                                data.result,
                                [{
                                    text: 'OK',
                                    onPress: () => resolve(),
                                    style: 'cancel'
                                },
                                ],
                                { cancelable: false });
                        })

                    } else {
                        this.setState(
                            {
                                errorEmail: data.email ? data.email[0] : '',
                                errorPassword: data.password ? data.password[0] : '',
                            }
                        );
                    }


                })
        }


    }

    renderButton() {
        if (!this.state.isLoading)
            return (
                <View style={styles.containerButton}>
                    <TouchableNativeFeedback
                        onPress={() => this.login()}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.nativeButton}>
                            <Text style={styles.nativeButton_Text}>entrar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            );

        return null;
    }

    renderOverlay() {
        if (this.state.isLoading) {
            return <Overlay />
        }
        return null;
    }

    render() {
        return this.state.isLoadingPage ? <Overlay /> :
            (
                <View style={styles.container}>
                    <View style={styles.titleC}>
                        <Text style={styles.title}>Efetue o Login para ter acesso as postagens</Text>
                    </View>
                    <View style={styles.form}>
                        <FormRow>
                            <TextInput onChangeText={value =>
                                this.onChangeHandler('email', value)
                            }
                                value={this.state.email}
                                keyboardType="email-address"
                                placeholder="Informe o E-mail"
                                style={styles.textInput}
                                selectionColor={PURPLE_500} />
                            {this.state.errorEmail ?
                                <Message styles={styles.messageError} message={this.state.errorEmail} />
                                : null}
                        </FormRow>
                        <FormRow>
                            <TextInput onChangeText={value => this.onChangeHandler('password', value)}
                                value={this.state.password}
                                secureTextEntry
                                placeholder="******"
                                style={styles.textInput}
                                selectionColor={PURPLE_500} />
                            {this.state.errorPassword ?
                                <Message styles={styles.messageError} message={this.state.errorPassword} />
                                : null}
                        </FormRow>

                        {this.renderButton()}
                    </View>
                    {this.renderOverlay()}
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
        flex: 1
    },
    form: {
        marginTop: 100,
        flex: 1
    },
    titleC: {
        // backgroundColor: 'red'

    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        color: PURPLE_300
    },
    textInput: {
        backgroundColor: PURPLE_50,
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 4
    },
    nativeButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30 * 2,
        paddingRight: 30 * 2,
        backgroundColor: PURPLE_500,
        borderRadius: 4
    },
    nativeButton_Text: {
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15

    },
    messageError: {
        color: RED_500
    }
});

export default connect(null, { login, checkLogin })(LoginPage);
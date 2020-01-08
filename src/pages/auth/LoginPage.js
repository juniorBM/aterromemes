import React from 'react';
import {
    View, TextInput, Text, StyleSheet,
    TouchableNativeFeedback, ActivityIndicator, Dimensions
} from 'react-native';

import FormRow from '../../components/FormRow';
import Message from '../../components/Message';
import Overlay from '../../components/Overlay';
import Validate from '../../utils/validatorFields';


import { PURPLE_500, PURPLE_300, PURPLE_50, RED_500 } from '../../utils/colors';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            message: '',
            errorEmail: '',
            errorPassword: ''
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
                'messageMinLength': 'Senha deve ter no mínimo 6 caracteres'
            }
        }

    }

    onChangeHandler(field, value, validations = null) {

        this.setState({
            [field]: value,
        });
    }

    login() {
        this.setState({
            isLoading: true,
        });

        this.validations['email'].value = this.state.email;
        this.validations['password'].value = this.state.password;

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
            //Dispatch action assync
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
        const validationEmail = ['required', 'email'];

        return (
            <View style={styles.container}>
                <View style={styles.titleC}>
                    <Text style={styles.title}>Efetue o Login para ter acesso as postagens.</Text>
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
})
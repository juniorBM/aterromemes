import React from 'react';
import {
    View, TextInput, Text, StyleSheet,
    TouchableNativeFeedback, TouchableWithoutFeedback, AsyncStorage
} from 'react-native';

import FormRow from '../../components/FormRow';
import Message from '../../components/Message';
import Overlay from '../../components/Overlay';
import Validate from '../../utils/validatorFields';
import CheckBoxCustom from '../../components/CheckBoxCustom';
import { connect } from 'react-redux'
import { storeUser } from '../../actions';
import { StackActions, NavigationActions } from 'react-navigation'

import { PURPLE_500, PURPLE_300, PURPLE_50, RED_500 } from '../../utils/colors';

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isLoading: false,
            message: '',
            errorName: '',
            errorEmail: '',
            errorPassword: '',
            errorTerms: '',
            terms: false,
        };

        this.validations = {
            'name':
            {
                'rules': ['required', 'minLength'],
                'rules_value': { 'minLength': 6 },
                'value': '',
                'messageRequired': 'Nome é obrigatório.',
                'messageMinLength': 'Nome deve ter no mínimo 6 caracteres.'
            },
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
            },
            'terms':
            {
                'rules': ['required'],
                'value': false,
                'messageRequired': 'Aceite os Termos de Uso.',
            }
        }

        this.termsLink = (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('TermsPage')
            }><Text style={styles.linkTerms}>Termos de uso</Text></TouchableWithoutFeedback>
        )
    }

    onChangeHandler(field, value) {

        this.setState({
            [field]: value,
        });
    }

    register() {

        const { name, email, password, terms } = this.state;
        this.setState({
            isLoading: true,
        });


        this.validations['name'].value = name;
        this.validations['email'].value = email;
        this.validations['password'].value = password;
        this.validations['terms'].value = terms;

        const nameFields = ['name', 'email', 'password', 'terms'];

        const validated = Validate(nameFields, this.validations);

        if (Object.keys(validated).length > 0) {
            this.setState(
                {
                    errorName: validated['errorName'],
                    errorEmail: validated['errorEmail'],
                    errorPassword: validated['errorPassword'],
                    errorTerms: validated['errorTerms'],
                    isLoading: false
                }
            )

        } else {
            this.props.storeUser({ name, email, password })
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
                    
                    this.setState(
                        {
                            errorName: data.name ? data.name[0] : '',
                            errorEmail: data.email ? data.email[0] : '',
                            errorPassword: data.password ? data.password[0] : '',
                            isLoading: false
                        }
                    )

                })
        }


    }

    renderButton() {

        if (!this.state.isLoading)
            return (
                <View style={styles.containerButton}>
                    <TouchableNativeFeedback
                        onPress={() => this.register()}
                        background={TouchableNativeFeedback.SelectableBackground()}>
                        <View style={styles.nativeButton}>
                            <Text style={styles.nativeButton_Text}>cadastrar</Text>
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
        return (
            <View style={styles.container}>
                <View style={styles.titleC}>
                    <Text style={styles.title}>Cadastre-se abaixo para ter acesso as postagens</Text>
                </View>
                <View style={styles.form}>
                    <FormRow>
                        <TextInput onChangeText={value =>
                            this.onChangeHandler('name', value)
                        }
                            value={this.state.name}
                            placeholder="Informe o seu nome"
                            style={styles.textInput}
                            selectionColor={PURPLE_500} />
                        {this.state.errorName ?
                            <Message styles={styles.messageError} message={this.state.errorName} />
                            : null}
                    </FormRow>
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
                    <FormRow>
                        <CheckBoxCustom
                            text={this.termsLink}
                            textSize={25}
                            textColor={PURPLE_500}
                            color={PURPLE_500}
                            size={30}
                            checked={this.state.terms}
                            onPress={() => {
                                this.setState({ terms: !this.state.terms });
                            }}
                        />
                        {this.state.errorTerms ?
                            <Message styles={styles.messageError} message={this.state.errorTerms} />
                            : null}
                    </FormRow>

                    {this.renderButton()}
                </View>
                {this.renderOverlay()}
            </View>
        );
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
    },
    linkTerms: {
        color: PURPLE_500,
        textDecorationLine: 'underline'
    }
});

export default connect(null, { storeUser })(RegisterPage);
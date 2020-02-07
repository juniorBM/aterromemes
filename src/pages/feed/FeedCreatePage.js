import React from 'react';
import { View, Text, Alert, Image, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import FormRow from '../../components/FormRow';
import { PURPLE_500, PURPLE_300, PURPLE_100, PURPLE_50, RED_500 } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Validate from '../../utils/validatorFields';
import Message from '../../components/Message';
import { feedStore } from '../../services';
import { StackActions, NavigationActions } from 'react-navigation'
import Overlay from '../../components/Overlay';

class FeedCreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            image: '',
            imageBase64: '',
            isLoading: false,
            errorTitle: '',
            errorImage: '',
        };

        this.validations = {
            'title':
            {
                'rules': ['required', 'minLength', 'maxLength'],
                'rules_value': { 'minLength': 6, 'maxLength': 200 },
                'value': '',
                'messageRequired': 'Título é obrigatório.',
                'messageMinLength': 'Título deve ter no mínimo 6 caracteres.',
                'messageMaxLength': 'Título deve ter no máximo 200 caracteres.'
            },
            'image':
            {
                'rules': ['required'],
                'value': '',
                'messageRequired': 'Imagem é obrigatório.',
            }
        }
    }

    componentDidMount() {
        this.getPermissionAsync();
    }


    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.cancelled) {
            this.setState({
                image: result.uri,
                imageBase64: result.base64
            });
        }
    };

    onChangeHandler(field, value, validations = null) {

        this.setState({
            [field]: value,
        });
    }

    feedAdd() {
        const { title, image } = this.state;
        this.setState({
            isLoading: true,
        });

        this.validations['title'].value = title;
        this.validations['image'].value = image;

        const nameFields = ['title', 'image'];

        const validated = Validate(nameFields, this.validations);

        if (Object.keys(validated).length > 0) {
            this.setState(
                {
                    errorTitle: validated['errorTitle'],
                    errorImage: validated['errorImage'],
                    isLoading: false
                }
            )

        } else {

            const feed = {
                title: this.state.title,
                image: 'data:image/jpg;base64,' + this.state.imageBase64
            };

            const api_token = this.props.user.api_token;
            feedStore({ feed, api_token })
                .then((data) => {
                    console.log(data.data);

                    if (data.data.status == 'success') {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'FeedListPage' })],
                        });

                        return this.props.navigation.dispatch(resetAction);
                    }
                }).catch((err) => {
                    const { data } = err.response;
                    if (data.status == 'error') {
                        return new Promise((resolve, reject) => {
                            Alert.alert(
                                'Erro ao fazer uma postagem',
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
                                errorTitle: data.title ? data.title[0] : '',
                                errorImage: data.image ? data.image[0] : '',
                            }
                        );
                    }
                });

        }
    }

    renderOverlay() {
        if (this.state.isLoading) {
            return <Overlay />
        }
        return null;
    }
    render() {
        console.log(this.props);
        
        return (
            <View style={styles.container}>
                <View style={styles.titleC}>
                    <Text style={styles.title}>Faça sua postagem com um título e uma imagem.</Text>
                </View>
                <View style={styles.form}>
                    <FormRow>
                        <TextInput onChangeText={value =>
                            this.onChangeHandler('title', value)
                        }
                            value={this.state.title}
                            placeholder="Informe o Título"
                            style={styles.textInput}
                            selectionColor={PURPLE_500} />
                        {this.state.errorTitle ?
                            <Message styles={styles.messageError} message={this.state.errorTitle} />
                            : null}
                    </FormRow>
                    <View style={styles.formImage}>
                        <TouchableWithoutFeedback
                            onPress={() => this._pickImage()}>
                            <View style={styles.formImageContainer} >
                                {
                                    this.state.image ?
                                        <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />
                                        : <Icon name="image" size={100} color={PURPLE_50} />
                                }

                            </View>
                        </TouchableWithoutFeedback>
                        {this.state.errorImage ?
                            <Message styles={styles.messageError} message={this.state.errorImage} />
                            : null}
                    </View>
                    <View style={styles.containerButtosn}>
                        <TouchableNativeFeedback
                            onPress={() => this.feedAdd()
                            }
                            background={TouchableNativeFeedback.SelectableBackground()}>
                            <View style={styles.nativeButton}>
                                <Text style={styles.nativeButton_Text}>postar</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                
                {/* <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                /> */}
                {/* {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
                {this.renderOverlay()}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white'
    },
    form: {
        flex: 1,
        justifyContent: 'space-evenly'
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
    formImage: {
        alignItems: 'center'
    },
    formImageContainer: {
        backgroundColor: PURPLE_100,
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    },
    containerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15

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
});

function mapStateToProps(state) {
    return {
        user: state.user,
        feeds: state.feeds
    }
}

export default connect(mapStateToProps, null)(FeedCreatePage);
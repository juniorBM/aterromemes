import React from 'react';
import {
    View, TextInput, Text, StyleSheet, Dimensions, ActivityIndicator,
    TouchableNativeFeedback, TouchableWithoutFeedback, AsyncStorage, Button, FlatList
} from 'react-native';
import Card from '../../components/Card';
import { connect } from 'react-redux'
import FabButton from '../../components/FabButon';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PURPLE_500, PURPLE_300, PURPLE_50, RED_500, PURPLE_100 } from '../../utils/colors';
import { allFeeds, likeFeed } from '../../actions';


class FeedListPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextPage: null,
            loadingFeed: true
        };
    }


    componentDidMount() {

        // console.log(user.api_token);
        this.loadFeeds();

    }

    likeFeed(feedId) {
        const { user } = this.props;
        // console.log(this.props, feedId);
        
        
        this.props.likeFeed({ feedId: feedId, api_token: user.api_token })
            .then((data) => {
                console.log(data);

            }).catch((err) => {
                console.log(err);

            });
    }

    loadFeeds(params) {
        // console.log('teste');
        this.setState({
            loadingFeed: true
        });
        // console.log('state ', this.state.loadingFeed);

        const { allFeeds, user } = this.props

        if (this.state.nextPage != 'finish') {
            // setTimeout(() => {
            allFeeds({ nextPage: this.state.nextPage, api_token: user.api_token })
                .then((data) => {
                    if (data.data.result.current_page != data.data.result.last_page) {
                        this.setState({
                            nextPage: data.data.result.next_page_url,
                            loadingFeed: false
                        });
                    } else {
                        this.setState({
                            nextPage: 'finish',
                            loadingFeed: false
                        });
                    }


                }).catch((err) => {
                    console.log(err);

                });
            // }, 3000);
        } else {
            this.setState({
                loadingFeed: false
            });
        }





    }

    _onMomentumScrollBegin = () => this.setState({ onEndReachedCalledDuringMomentum: false });

    _handleLoadMore = () => {
        if (!this.state.loadingFeed) {
            this.loadFeeds();
        }

    };

    renderFooter = () => {
        if (!this.state.loadingFeed) return false;
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={PURPLE_500} />
            </View>
        );
    };
    render() {
        const { feeds, navigation } = this.props;
        // console.log('akii heheh ', feeds);

        return (

            <View style={styles.container}>
                {/* <Button title={'teste'} onPress={() => console.log(this.props)                } /> */}
                <FlatList
                    data={feeds}
                    renderItem={({ item, index }) => (
                        <Card feed={item}
                            likeFeed={() => this.likeFeed(item.id)}
                        />
                    )}
                    keyExtractor={(item, i) => i.toString()}
                    onEndReached={this._handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.renderFooter}
                // initialNumToRender={1}
                // bounces={false}
                />
                {/* <Card /> */}
                <FabButton
                    color={PURPLE_500}
                    colorIcon={'white'}
                    size={70}
                    onPress={() => { this.props.navigation.navigate('FeedCreatePage') }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: PURPLE_50,
        flex: 1
    },
    loading: {
        marginTop: 15
    }

});

function mapStateToProps(state) {

    const { feeds } = state;

    return {
        user: state.user,
        feeds: state.feeds
    }
}

export default connect(mapStateToProps, { allFeeds, likeFeed })(FeedListPage);
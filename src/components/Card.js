import React from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { PURPLE_50, PURPLE_500, PURPLE_300, RED_100, PURPLE_100, RED_500 } from '../utils/colors'

export default class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { feed, likeFeed } = this.props;
        // console.log('akiii kakakaka', feed);

        return (
            <View style={styles.cardContent}>
                <View style={styles.cardContentHeader}>
                    <View style={styles.cardContentHeader__img}>
                        <Icon name="person" size={30} color={'black'} />
                    </View>
                    <View style={styles.cardContentHeader__title}>
                        <Text>{feed.user.name}</Text>
                    </View>
                </View>
                <View style={styles.cardContentTitle}>
                    <Text>{feed.title}</Text>
                </View>
                <View style={styles.cardContentImage}>
                    <Image resizeMode="cover" aspectRatio={1}
                        source={{ uri: feed.image_post }} />
                </View>
                <View style={styles.cardContentActions}>
                    <TouchableWithoutFeedback
                        onPress={() => likeFeed()}
                        // onPress={() => console.log('teste')}
                        >
                        <View style={[styles.cardContentActions__button, styles.cardContentActions__buttonFirst]}>
                            <Icon name="thumb-up" size={30} color={PURPLE_100} />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                        onPress={() => console.log('asda')

                        }>
                        <View style={[styles.cardContentActions__button]}>
                            <Icon name="thumb-down" size={30} color={RED_100} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContent: {
        backgroundColor: 'white',
        elevation: 2,
        marginBottom: 15,
        borderRadius: 4

    },
    cardContentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        marginRight: 15,
        // backgroundColor: 'yellow'
    },
    cardContentHeader__img: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        backgroundColor: PURPLE_50,
        borderRadius: 100
    },
    cardContentHeader__title: {
        fontSize: 18,
        marginLeft: 15,
        flex: 1
    },

    cardContentTitle: {
        marginLeft: 15,
        marginBottom: 15,
        marginRight: 15
    },
    cardContentImage: {
    },
    cardContentActions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cardContentActions__button: {
        padding: 15,
        flex: 1,
        alignItems: 'center',
    },
    cardContentActions__buttonFirst: {
        borderRightWidth: .5
    },
    cardContentActions__buttonLiked: {
        backgroundColor: PURPLE_50
    },
    cardContentActions__buttonTrash: {
        backgroundColor: RED_100
    }
})

import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const Message = props => {
    const { message, styles } = props;
    return (
        <View style={styles}>
            <Text>{message}</Text>
        </View>
    )
};

export default Message;

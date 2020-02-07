import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const TermsPage = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Utilize por sua conta e risco :)
            </Text>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#FFF',
        marginTop: 5,
        marginBottom: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15

    },
    text: {
        fontSize: 40,
        textAlign: 'center'
    }
});

export default TermsPage;

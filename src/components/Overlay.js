import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { PURPLE_500 } from '../utils/colors';

const Overlay = () => (
    <View style={styles.overlay}>
        <View style={styles.overlayLoading}>
            <ActivityIndicator size="large" color={PURPLE_500} />
            <Text style={styles.overlayText}>Aguarde...</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
    overlay: {
        backgroundColor: '#00000080',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    overlayLoading: {
        backgroundColor: 'white',
        opacity: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        width: 200,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingLeft: 15,
        elevation: 5,
        borderRadius: 4
    },
    overlayText: {
        fontSize: 20,
        paddingLeft: 15,
        color: PURPLE_500
    },
});

export default Overlay;
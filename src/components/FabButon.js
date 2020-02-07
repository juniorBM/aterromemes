import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// var COLOR = '';
var SIZE = '';


const FabButton = ({ onPress, size, color, colorIcon }) => {
    var COLOR = color;
    SIZE = size;
    // console.log(COLOR);
    
    return (<TouchableWithoutFeedback
        onPress={() => onPress()
        }>
        <View style={[styles.fabButton, {
            backgroundColor: color,
            width: size,
            height: size
        }]}>
            <Icon name="add" size={size / 2} color={colorIcon} />
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    fabButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        borderRadius: 100,
        elevation: 8,
        borderWidth: 0
    }
});

export default FabButton;
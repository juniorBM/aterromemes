import React from 'react';
import {
    View, Text, StyleSheet,TouchableWithoutFeedback,
    Animated, Easing, Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'


export default class CheckBoxCustom extends React.Component {
    constructor(props) {
        super(props);

        const maxOpacity = 0.12;

        this.state = {
            maxOpacity,
            scaleValue: new Animated.Value(0.01),
            opacityValue: new Animated.Value(maxOpacity),
        };

        this.renderRippleView = this.renderRippleView.bind(this);
        this.onPressedIn = this.onPressedIn.bind(this);
        this.onPressedOut = this.onPressedOut.bind(this);
    }

    onPressedIn() {
        Animated.timing(this.state.scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    onPressedOut() {
        Animated.timing(this.state.opacityValue, {
            toValue: 0,
            useNativeDriver: Platform.OS === 'android',
        }).start(() => {
            this.state.scaleValue.setValue(0.01);
            this.state.opacityValue.setValue(this.state.maxOpacity);
        });
    }
    renderRippleView() {
        const { size, color } = this.props;
        const { scaleValue, opacityValue } = this.state;

        const rippleSize = size + 15;

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    // top: 0,
                    // left: 0,
                    // right: 0,
                    width: rippleSize,
                    height: rippleSize,
                    borderRadius: rippleSize / 2,
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                    backgroundColor: color || 'black',
                }}
            />
        );
    }

    checkboxValue() {
        const { checked, color, size } = this.props;

        if (checked) {
            return (<Icon name="check-box" size={size} color={color} />);
        }

        return (<Icon name="check-box-outline-blank" size={size} color={color} />);
    }

    render() {
        const {text, onPress, textSize, textColor} = this.props;
        const styledText = {
            fontSize: textSize ? textSize : 15,
            color: textColor ? textColor :  'black'
        }
        return (
            <View style={styles.containerCheck}>
                <TouchableWithoutFeedback
                    onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}
                    onPress={() => onPress()
                    }>
                    <View style={styles.checkbox}>

                        {this.renderRippleView()}
                        <View>
                            {this.checkboxValue()}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={[styles.checkboxText, styledText]}>{text}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerCheck: {
        // backgroundColor: 'red',
        flexDirection: 'row'
    },
    checkbox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        width: 40,
        height: 40,
        opacity: .4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    checkboxText: {
        alignSelf: 'center',
        marginLeft: 10
    },
})
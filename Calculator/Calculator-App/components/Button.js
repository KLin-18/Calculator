import React from "react";
import { TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";

const screen = Dimensions.get("window");
const buttonaWidth = Math.floor(screen.width / 5);


const styles = StyleSheet.create({
    text: {
        color: "#fff",
        fontSize: 25,
    },
    textSecondary: {
        color: "#060606",
    },
    button: {
        backgroundColor: "#333333",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: buttonaWidth - 10,
        borderRadius: buttonaWidth,
        margin: 5,

    },
    buttonDouble: {
        flex: 0,
        alignItems: 'flex-start',
        paddingLeft: 40,
        width: screen.width / 2 - 10,
    },
    buttonSecondary: {
        backgroundColor: "#a6a6a6",
    },
    buttonAccent: {
        backgroundColor: "#f09a36",
    },
})

export default ({ onPress, text, size, theme }) => {
    const buttonStyle = [styles.button];
    const textStyle = [styles.text];
    if (size === "double") {
        buttonStyle.push(styles.buttonDouble);
    }
    if(theme == "secondary") {
        buttonStyle.push(styles.buttonSecondary);
        textStyle.push(styles.textSecondary);
    } else if (theme == "accent") {
        buttonStyle.push(styles.buttonAccent);
    }
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <Text style={textStyle}> {text} </Text>
        </TouchableOpacity>
    );
};
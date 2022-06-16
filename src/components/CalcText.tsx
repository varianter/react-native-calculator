import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

export type CalcTextProps = {
  text: string | number;
  style?: TextStyle;
};

export default function CalcText({ text, style }: CalcTextProps) {
  return <Text style={[styles.title, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "#000",
    fontSize: 40,
  },
});

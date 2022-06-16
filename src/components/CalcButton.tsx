import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import CalcText from "./CalcText";

export type CalcButtonProps = {
  text: string;
  onPress: () => void;
};

export default function CalcButton({ text, onPress }: CalcButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <CalcText text={text} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 20,
    margin: 5,
    borderRadius: 10,
  },
});

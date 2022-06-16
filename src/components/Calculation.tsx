import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { memory, operation } from "../Calculator";
import CalcText from "./CalcText";

export type CalculationProps = {
  memory: memory;
  operation: operation;
  input: number;
  solution: number;
};

export default function Calculation({
  memory,
  operation,
  input,
  solution,
}: CalculationProps) {
  return (
    <View style={styles.container}>
      {memory.map((m) => (
        <>
          <CalcText style={styles.faded} text={m.operation || ""} />
          <CalcText style={styles.faded} text={m.value} />
        </>
      ))}
      <>
        <CalcText style={styles.bold} text={operation || ""} />
        <CalcText style={styles.bold} text={input} />
      </>
      <CalcText style={styles.faded} text="=" />
      <CalcText text={solution} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  faded: {
    color: "#aaa",
  },
  bold: {
    fontWeight: "bold",
  },
});

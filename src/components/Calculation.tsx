import React from "react";
import { StyleSheet, View } from "react-native";
import { input, memory } from "../Calculator";
import CalcText from "./CalcText";

export type CalculationProps = {
  memory: memory;
  input: input;
  solution: number;
};

export default function Calculation({
  memory,
  input,
  solution,
}: CalculationProps) {
  return (
    <View style={styles.container}>
      {/* Memory */}
      {memory.map((m, index) => (
        <CalcText key={index} style={styles.faded} text={inputToText(m)} />
      ))}

      {/* Current input */}
      <CalcText style={styles.bold} text={inputToText(input)} />

      {/* Solution */}
      <CalcText style={styles.faded} text="=" />
      <CalcText text={solution} />
    </View>
  );
}

function inputToText(m: input) {
  return m.operation ? m.operation + m.value : m.value;
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

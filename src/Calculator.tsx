import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CalcButton from "./components/CalcButton";
import CalcText from "./components/CalcText";
import Calculation from "./components/Calculation";

export type operation = "+" | "-" | "x" | undefined;

export type memory = {
  value: number;
  operation: operation;
}[];

export default function Calculator() {
  const [memory, setMemory] = useState<memory>([]);
  const [input, setInput] = useState(0);
  const [operation, setOperation] = useState<operation>(undefined);
  const [solution, setSolution] = useState<number>(0);

  const enterNumber = (number: number) => {
    setInput(input * 10 + number);
  };

  const performOperation = (op: operation) => {
    setMemory(memory.concat({ value: input, operation: operation }));
    setOperation(op);
    setInput(0);
  };

  const reset = () => {
    setInput(0);
    setOperation(undefined);
    setMemory([]);
  };

  useEffect(() => {
    let sum = 0;
    memory.concat({ operation: operation, value: input }).forEach((m) => {
      if (m.operation === undefined) sum = m.value;
      if (m.operation === "+") sum = sum + m.value;
      if (m.operation === "-") sum = sum - m.value;
      if (m.operation === "x") sum = sum * m.value;
    });
    setSolution(sum);
  }, [memory, input]);

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {memory.length > 0 && (
          <Calculation
            memory={memory}
            operation={operation}
            input={input}
            solution={solution}
          />
        )}
        <CalcText
          style={{
            textAlign: "right",
            marginTop: "auto",
            fontWeight: "bold",
            fontSize: 60,
          }}
          text={operation ? operation + input : input}
        />
      </View>
      <View style={styles.calcRow}>
        <CalcButton onPress={() => enterNumber(1)} text="1" />
        <CalcButton onPress={() => enterNumber(2)} text="2" />
        <CalcButton onPress={() => enterNumber(3)} text="3" />
        <CalcButton onPress={() => {}} text="" />
      </View>
      <View style={styles.calcRow}>
        <CalcButton onPress={() => enterNumber(4)} text="4" />
        <CalcButton onPress={() => enterNumber(5)} text="5" />
        <CalcButton onPress={() => enterNumber(6)} text="6" />
        <CalcButton onPress={() => {}} text="" />
      </View>
      <View style={styles.calcRow}>
        <CalcButton onPress={() => enterNumber(7)} text="7" />
        <CalcButton onPress={() => enterNumber(8)} text="8" />
        <CalcButton onPress={() => enterNumber(9)} text="9" />
        <CalcButton onPress={() => performOperation("x")} text="*" />
      </View>
      <View style={styles.calcRow}>
        <CalcButton onPress={() => performOperation("+")} text="+" />
        <CalcButton onPress={() => performOperation("-")} text="-" />
        <CalcButton onPress={() => enterNumber(0)} text="0" />
        <CalcButton onPress={() => reset()} text="C" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  display: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  displayText: {
    fontSize: 40,
  },
  calcRow: {
    flexDirection: "row",
  },
});

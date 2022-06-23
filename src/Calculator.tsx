import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalcButton from "./components/CalcButton";
import CalcText from "./components/CalcText";
import Calculation from "./components/Calculation";
import { Accelerometer } from "expo-sensors";
import { Subscription } from "expo-sensors/build/Pedometer";

// Calculator types
export type operation = "+" | "-" | "x" | undefined;
export type input = {
  value: number;
  operation: operation;
};
export type memory = input[];

export default function Calculator() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const { x, y, z } = data;

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(100);
    return () => _unsubscribe();
  }, []);

  const defaultInput = { value: 0, operation: undefined };
  const [memory, setMemory] = useState<memory>([]);
  const [input, setInput] = useState<input>(defaultInput);
  const [solution, setSolution] = useState<number>(0);

  // Number buttons
  const enterNumber = (number: number) => {
    setInput({
      ...input,
      value: input.value * 10 + number,
    });
  };
  // +, - and * buttons
  const performOperation = (operation: operation) => {
    // Switch operation if input is 0
    if (input.value === 0) {
      setInput({ ...input, operation: operation });
      return;
    }
    setMemory(memory.concat(input));
    setInput({ value: 0, operation: operation });
  };
  // Clear input
  const C = () => setInput({ ...input, value: 0 });
  // Clear input and memory
  const AC = () => {
    setMemory([]);
    setInput(defaultInput);
  };

  // Calculate solution when the input changes
  useEffect(() => {
    let sum = 0;
    memory.concat(input).forEach((m) => {
      if (m.operation === undefined) sum = m.value;
      if (m.operation === "+") sum = sum + m.value;
      if (m.operation === "-") sum = sum - m.value;
      if (m.operation === "x") sum = sum * m.value;
    });
    setSolution(sum);
  }, [input]);

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Calculation memory={memory} input={input} solution={solution} />
        <CalcText
          style={styles.input}
          text={input.operation ? input.operation + input.value : input.value}
        />
        <CalcText
          style={{ opacity: Math.abs(x) }}
          text={"X" + x.toFixed(3)}
        ></CalcText>
        <CalcText
          style={{ opacity: Math.abs(y) }}
          text={"Y" + y.toFixed(3)}
        ></CalcText>
        <CalcText
          style={{ opacity: Math.abs(z) }}
          text={"Z" + z.toFixed(3)}
        ></CalcText>
      </View>
      <View style={styles.keyboardRow}>
        <CalcButton onPress={() => enterNumber(1)} text="1" />
        <CalcButton onPress={() => enterNumber(2)} text="2" />
        <CalcButton onPress={() => enterNumber(3)} text="3" />
        <CalcButton onPress={() => performOperation("x")} text="*" />
      </View>
      <View style={styles.keyboardRow}>
        <CalcButton onPress={() => enterNumber(4)} text="4" />
        <CalcButton onPress={() => enterNumber(5)} text="5" />
        <CalcButton onPress={() => enterNumber(6)} text="6" />
        <CalcButton onPress={() => performOperation("-")} text="-" />
      </View>
      <View style={styles.keyboardRow}>
        <CalcButton onPress={() => enterNumber(7)} text="7" />
        <CalcButton onPress={() => enterNumber(8)} text="8" />
        <CalcButton onPress={() => enterNumber(9)} text="9" />
        <CalcButton onPress={() => performOperation("+")} text="+" />
      </View>
      <View style={styles.keyboardRow}>
        <CalcButton onPress={() => {}} text="" />
        <CalcButton onPress={() => enterNumber(0)} text="0" />
        {input.value === 0 ? (
          <CalcButton onPress={() => AC()} text="AC" />
        ) : (
          <CalcButton onPress={() => C()} text="C" />
        )}
        <CalcButton onPress={() => {}} text="" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  screen: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  input: {
    textAlign: "right",
    marginTop: "auto",
    fontWeight: "bold",
    fontSize: 60,
  },
  keyboardRow: {
    flexDirection: "row",
  },
});

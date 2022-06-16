import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Calculator from "./src/Calculator";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar style="light" />
      <Calculator></Calculator>
    </SafeAreaView>
  );
}

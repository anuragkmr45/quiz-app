import { StatusBar } from "expo-status-bar";
import { StyleSheet, Appearance } from "react-native";
import Main from "./navigations/Main";

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  return (
    <>
      <StatusBar style={`${colorScheme == "dark" ? "light" : "light"}`} />
      <Main />
    </>
  );
}

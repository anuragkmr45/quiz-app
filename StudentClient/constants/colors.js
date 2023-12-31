import { Platform, StatusBar } from "react-native";

export default Colors = {
  white: 'white',
  black: 'black',
  submit: 'rgb(66, 90, 130)',
  primary: "rgba(66, 90, 130, 0.03)",
  secondary: "rgba(60, 80, 120, 0.1)",
  secondaryDark: "#3c3c3c",
  accent: "#ffcc00",
  text: "rgb(66, 90, 130)",
  textDark: "white",
  error: "#ff0000",
};

export const containerStyle = {
  flex: 1,
  backgroundColor: Colors.primary,
  paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  padding: 35,
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// ** icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// ** screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";

import colors from "../constants/colors";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.secondaryDark,
          height: 60,
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          borderTopWidth: 0,
          position: "absolute",
          bottom: 0,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: colors.white },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={30} color={colors.white} />
            ) : (
              <AntDesign name="home" size={30} color={colors.white} />
            ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          headerShown: false,
          tabBarLabelStyle: { color: colors.white  },
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="newspaper" size={30} color={colors.white} />
            ) : (
              <Ionicons name="newspaper-outline" size={30} color={colors.white} />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/screens/Homepage";
import AuthScreen from "./src/screens/AuthScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import MoistureDashboard from "./src/screens/MoistureDashboard";
import AiAssistantScreen from "./src/screens/AiAssistanceScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Moisture" component={MoistureDashboard} />
        <Stack.Screen name="AiAssistant" component={AiAssistantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

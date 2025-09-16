import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export default function DashboardScreen({ navigation }) {
  const buttons = [
    {
      title: "My Profile",
      icon: (
        <MaterialCommunityIcons name="account-circle" size={28} color="#fff" />
      ),
      onPress: () => navigation.navigate("Profile"),
      bgColor: "#4CAF50",
    },
    {
      title: "AI Assistant",
      icon: (
        <MaterialCommunityIcons name="robot-happy" size={28} color="#fff" />
      ),
      onPress: () => navigation.navigate("AiAssistant"),
      bgColor: "#7B1FA2",
    },
    {
      title: "Weather Forecast",
      icon: <Feather name="cloud-rain" size={28} color="#fff" />,
      onPress: () => navigation.navigate("Weather"),
      bgColor: "#1E88E5",
    },
    {
      title: "Logout",
      icon: <MaterialCommunityIcons name="logout" size={28} color="#fff" />,
      onPress: () => {
        // TODO: clear token & navigate to login
        navigation.replace("Auth");
      },
      bgColor: "#D32F2F",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Krishi Sakhi</Text>
      <Text style={styles.subtitle}>Your trusted farming assistant</Text>

      <View style={styles.buttonsWrapper}>
        {buttons.map(({ title, icon, onPress, bgColor }) => (
          <TouchableOpacity
            key={title}
            style={[styles.button, { backgroundColor: bgColor }]}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>{icon}</View>
            <Text style={styles.buttonText}>{title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E8F5E9",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 6,
    textAlign: "center",
    fontFamily: "sans-serif-medium",
  },
  subtitle: {
    fontSize: 20,
    color: "#4CAF50",
    marginBottom: 36,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  buttonsWrapper: {
    width: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: windowWidth * 0.8,
  },
  iconWrapper: {
    marginRight: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});

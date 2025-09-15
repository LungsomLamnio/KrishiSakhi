import React from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Krishi Sakhi</Text>
      <Text style={styles.subtitle}>Your personal farming assistant</Text>

      {/* Example Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title="My Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Crop Tips"
          onPress={() => navigation.navigate("CropTips")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Weather Forecast"
          onPress={() => navigation.navigate("Weather")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          onPress={() => {
            // TODO: clear token & navigate to login
            navigation.replace("Auth");
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F6FFF2",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#228b22",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4CAF50",
    marginBottom: 24,
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "60%",
    alignSelf: "center",
  },
});

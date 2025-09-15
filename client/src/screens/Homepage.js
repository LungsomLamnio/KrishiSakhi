import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

const Homepage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo or Banner */}
      <Image
        source={require("../../assets/krishi_sakhi_logo.png")}
        style={styles.logo}
      />
      {/* Welcome Text */}
      <Text style={styles.title}>Krishi Sakhi</Text>
      <Text style={styles.subtitle}>
        A digital friend for farmers, from sowing to harvest.
      </Text>
      {/* Get Started Button */}
      <Button
        title="Get Started"
        onPress={() => navigation.navigate("AiAssistant")}
        color="#228B22"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF2",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    marginBottom: 32,
  },
});

export default Homepage;

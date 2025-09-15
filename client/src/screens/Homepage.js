import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const Homepage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Soft shadow and round logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/krishi_sakhi_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <Text style={styles.title}>Krishi Sakhi</Text>
      <Text style={styles.subtitle}>
        Your digital farming companion from sowing to harvest.
      </Text>

      {/* Friendly illustration or decoration (optional) */}
      {/* <Image source={require("../../assets/farming_illustration.png")} style={styles.illustration} /> */}

      {/* Get Started Button with tactile feel */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={() => navigation.navigate("Auth")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {/* Friendly footer message */}
      <Text style={styles.footer}>Empowering farmers with technology 🌾</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Light natural green background
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    shadowColor: "#2E7D32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8, // Android shadow
    backgroundColor: "#A5D6A7",
    borderRadius: 100,
    padding: 20,
    marginBottom: 30,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#33691E",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 35,
    shadowColor: "#388E3C",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "600",
  },
  footer: {
    marginTop: 60,
    fontSize: 14,
    color: "#558B2F",
    fontStyle: "italic",
    textAlign: "center",
    opacity: 0.7,
  },
  // Optional illustration style if added
  // illustration: {
  //   width: width * 0.6,
  //   height: width * 0.4,
  //   marginTop: 30,
  //   resizeMode: 'contain',
  // },
});

export default Homepage;

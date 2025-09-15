import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { sendOtp, verifyOtp } from "../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen({ navigation }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!phone) {
      Alert.alert("Validation Error", "Please enter your phone number.");
      return;
    }
    setLoading(true);
    try {
      await sendOtp(phone);
      setOtpSent(true);
      Alert.alert("Success", "OTP sent to your phone.");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Validation Error", "Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const data = await verifyOtp(phone, otp);
      await AsyncStorage.setItem("authToken", data.token);
      Alert.alert("Success", "Logged in successfully!");
      navigation.replace("Profile"); // Adjust 'Home' to your main app screen name
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Krishi Sakhi</Text>
      {!otpSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={10}
          />
          <Button
            title={loading ? "Sending OTP..." : "Send OTP"}
            onPress={handleSendOtp}
            disabled={loading}
          />
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            maxLength={6}
          />
          <Button
            title={loading ? "Verifying..." : "Verify OTP"}
            onPress={handleVerifyOtp}
            disabled={loading}
          />
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FFF2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#228B22",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
});

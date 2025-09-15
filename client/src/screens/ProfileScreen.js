import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: "",
    city: "",
    state: "",
  });

  const [saving, setSaving] = useState(false);

  const saveProfile = () => {
    if (!profile.name.trim()) {
      Alert.alert("Validation error", "Please enter your name");
      return;
    }
    if (!profile.city.trim()) {
      Alert.alert("Validation error", "Please enter your city");
      return;
    }
    if (!profile.state.trim()) {
      Alert.alert("Validation error", "Please enter your state");
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert("Success", "Profile saved", [
        {
          text: "OK",
          onPress: () => navigation.replace("Dashboard"),
        },
      ]);
    }, 1500);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.header}>My Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        placeholderTextColor="#7B8D7B"
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={profile.city}
        onChangeText={(text) => setProfile({ ...profile, city: text })}
        placeholderTextColor="#7B8D7B"
      />

      <TextInput
        style={styles.input}
        placeholder="State"
        value={profile.state}
        onChangeText={(text) => setProfile({ ...profile, state: text })}
        placeholderTextColor="#7B8D7B"
      />

      <TouchableOpacity
        style={[styles.button, saving && styles.buttonDisabled]}
        onPress={saveProfile}
        disabled={saving}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {saving ? "Saving..." : "Save Profile"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: "#E9F5E1",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1,
  },
  input: {
    height: 55,
    borderRadius: 12,
    backgroundColor: "#F4FBF1",
    borderColor: "#81C784",
    borderWidth: 1.5,
    paddingHorizontal: 18,
    fontSize: 18,
    color: "#2E7D32",
    marginBottom: 25,
    shadowColor: "#a4d4a1",
    shadowRadius: 3,
    shadowOpacity: 0.6,
    shadowOffset: { width: 1, height: 2 },
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 16,
    borderRadius: 50,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#388E3C",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
  },
});

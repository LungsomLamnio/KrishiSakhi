import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

export default function ProfileScreen({ navigation }) {
  // receive navigation prop
  const [profile, setProfile] = useState({
    name: "Lungsom Lamnio",
    email: "lungsomlamnio@gmail.com",
    city: "Itanagar",
    state: "Arunachal Pradesh",
    farmSize: "2.5",
    crops: "Wheat, Rice, Maize",
  });

  const [saving, setSaving] = useState(false);

  // Dummy save function to simulate save
  const saveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert("Success", "Profile saved (dummy)", [
        {
          text: "OK",
          onPress: () => navigation.replace("Dashboard"), // Navigate to Dashboard
        },
      ]);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={profile.city}
        onChangeText={(text) => setProfile({ ...profile, city: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={profile.state}
        onChangeText={(text) => setProfile({ ...profile, state: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Farm Size (in acres)"
        keyboardType="numeric"
        value={profile.farmSize}
        onChangeText={(text) => setProfile({ ...profile, farmSize: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Crops (comma separated)"
        value={profile.crops}
        onChangeText={(text) => setProfile({ ...profile, crops: text })}
      />

      <Button
        title={saving ? "Saving..." : "Save Profile"}
        onPress={saveProfile}
        disabled={saving}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F6FFF2",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#228B22",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#228B22",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 18,
  },
});

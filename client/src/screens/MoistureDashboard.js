import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

const MoistureDashboard = () => {
  const [moisture, setMoisture] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const FLASK_API_URL = "http://127.0.0.1:5000";

  // GET moisture data
  const fetchMoistureData = async () => {
    try {
      const response = await fetch(`${FLASK_API_URL}/get_moisture`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMoisture(data.moisture);
      setTimestamp(data.timestamp);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMoisture(null);
      setTimestamp(null);
    }
  };

  // POST moisture update
  const updateMoisture = async () => {
    const moistureInt = parseInt(inputValue);
    if (isNaN(moistureInt) || moistureInt < 0 || moistureInt > 100) {
      Alert.alert("Invalid input", "Please enter an integer between 0 and 100");
      return;
    }

    try {
      const response = await fetch(`${FLASK_API_URL}/update_moisture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moisture: moistureInt }),
      });
      const data = await response.json();
      if (!data.ok) throw new Error(data.error || "Failed to update moisture");

      Alert.alert("Success", `Moisture updated to ${moistureInt}%`);
      setInputValue("");
      fetchMoistureData(); // refresh displayed data
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMoistureData();
    const interval = setInterval(fetchMoistureData, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agri-Tech Soil Moisture Dashboard</Text>

      {error ? (
        <Text style={styles.error}>Error: {error}</Text>
      ) : (
        <>
          <Text style={styles.label}>Current Soil Moisture</Text>
          <Text style={styles.moistureValue}>
            {moisture !== null ? `${moisture}%` : "--%"}
          </Text>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBar, { width: `${moisture || 0}%` }]}
            />
          </View>
          <Text style={styles.timestamp}>
            {timestamp
              ? `Last update: ${new Date(timestamp).toLocaleString()}`
              : "Waiting for data..."}
          </Text>
        </>
      )}

      <View style={{ marginTop: 30 }}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter new moisture % (0-100)"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button title="Update Moisture" onPress={updateMoisture} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f5f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  moistureValue: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2a9d8f",
    textAlign: "center",
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2a9d8f",
  },
  timestamp: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
  input: {
    borderColor: "#aaa",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default MoistureDashboard;

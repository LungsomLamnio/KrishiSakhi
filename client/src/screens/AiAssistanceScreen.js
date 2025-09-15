import React, { useState } from "react";
import { GEMINI_API_KEY } from "@env";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// Dummy offline AI response handler (Gemma)
const getOfflineResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes("weather")) {
    return "Gemma: The weather is sunny with mild temperatures today.";
  }
  if (lowerMsg.includes("crop")) {
    return "Gemma: Wheat requires well-drained soil and moderate rainfall.";
  }
  return "Gemma: Sorry, I can only assist with simple farming questions offline.";
};

const sendToGemini = async (message) => {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an agricultural assistant. Please answer the questions about farming, crops, agriculture specially regarding Kerala, India. Provide responses both in Malayalam and English. ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Gemini API error response body:", errBody);
      throw new Error("Failed to get response from Gemini API");
    }

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I didn't understand that."
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I am having trouble connecting to the service right now.";
  }
};

export default function AiAssistantScreen() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Gemini",
      text: "Hello! How can I assist you with your farm today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true); // toggle between Gemini (online) and Gemma (offline)

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), sender: "You", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    if (online) {
      const response = await sendToGemini(input);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "Gemini", text: response },
      ]);
    } else {
      const response = getOfflineResponse(input);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "Gemma", text: response },
      ]);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Krishi Sakhi AI Assistant</Text>
        <Button
          title={
            online ? "Switch to Offline (Gemma)" : "Switch to Online (Gemini)"
          }
          onPress={() => setOnline(!online)}
        />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBox,
              item.sender === "You" ? styles.userMsg : styles.aiMsg,
            ]}
          >
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything about your farm..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <Button
          title={loading ? "..." : "Send"}
          onPress={handleSend}
          disabled={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6FFF2", padding: 10 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#228B22" },
  chatContainer: { paddingBottom: 20 },
  messageBox: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMsg: { backgroundColor: "#D1FFC4", alignSelf: "flex-end" },
  aiMsg: { backgroundColor: "#E5E5E5", alignSelf: "flex-start" },
  sender: { fontWeight: "bold", marginBottom: 3 },
  message: { fontSize: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#228B22",
    paddingHorizontal: 10,
  },
});

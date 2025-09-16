import React, { useState } from "react";
import { GEMINI_API_KEY } from "@env";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as Speech from "expo-speech";

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
                  text: `
                        Respond concisely and directly to this farming/agriculture question related to Kerala, India.
                        - Do not introduce yourself or use phrases like "Okay, I can help you".
                        - Do not use markdown or bold formatting (do not use ** or *). Use plain text only.
                        - Give just the facts in a list or paragraph.
                        - Include the answer in both Malayalam and English, and clearly label the Malayalam section.
                        Question: ${message}
                        `,
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
      sender: "Sakhi",
      text: "Hello! How can I assist you with your farm today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);

  // Speak the AI response aloud using expo-speech
  const speakResponse = (text) => {
    Speech.speak(text, { language: "en-IN" });
  };

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
        { id: (Date.now() + 1).toString(), sender: "Sakhi", text: response },
      ]);
      speakResponse(response);
    } else {
      const response = getOfflineResponse(input);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "Gemma", text: response },
      ]);
      speakResponse(response);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.headerSection}>
        <Text style={styles.title}>Krishi Sakhi AI Assistant</Text>

        <TouchableOpacity
          style={[styles.toggleButton, online ? styles.online : styles.offline]}
          onPress={() => setOnline(!online)}
          activeOpacity={0.8}
        >
          <Text style={styles.toggleText}>
            {online ? "Switch to Offline (Gemma)" : "Switch to Online (Gemini)"}
          </Text>
        </TouchableOpacity>
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
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#228B22"
            style={styles.loader}
          />
        ) : (
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6FFF2", padding: 15 },
  headerSection: {
    marginBottom: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  toggleButton: {
    minWidth: 200,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 2,
    shadowColor: "#228B22",
    shadowOpacity: 0.18,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  online: {
    backgroundColor: "#43a047",
  },
  offline: {
    backgroundColor: "#757575",
  },
  toggleText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  chatContainer: { paddingBottom: 20 },
  messageBox: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  userMsg: {
    backgroundColor: "#D1FFC4",
    alignSelf: "flex-end",
    borderTopRightRadius: 0,
  },
  aiMsg: {
    backgroundColor: "#E5E5E5",
    alignSelf: "flex-start",
    borderTopLeftRadius: 0,
  },
  sender: { fontWeight: "bold", marginBottom: 4, color: "#444" },
  message: { fontSize: 16, color: "#333" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#228B22",
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  sendButton: {
    backgroundColor: "#228B22",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 12,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  loader: {
    marginLeft: 12,
  },
});

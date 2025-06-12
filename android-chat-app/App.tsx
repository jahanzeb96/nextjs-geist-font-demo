import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import ChatMessage from './components/ChatMessage';

const AI_MODELS = ['Grok', 'Deepseek', 'Chat GPT'];

export default function App() {
  const [selectedAI, setSelectedAI] = useState(AI_MODELS[0]);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome! Select an AI and start chatting.', sender: 'system' },
  ]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(selectedAI, inputText);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIResponse = (ai: string, input: string) => {
    switch (ai) {
      case 'Grok':
        return `Grok says: I understood "${input}" deeply.`;
      case 'Deepseek':
        return `Deepseek replies: Searching deeply for "${input}".`;
      case 'Chat GPT':
        return `Chat GPT responds: Here's a thoughtful answer to "${input}".`;
      default:
        return "I'm not sure how to respond to that.";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>AI Chat App</Text>

      <View style={styles.aiSelector}>
        {AI_MODELS.map((ai) => (
          <TouchableOpacity
            key={ai}
            style={[
              styles.aiButton,
              selectedAI === ai && styles.aiButtonSelected,
            ]}
            onPress={() => setSelectedAI(ai)}
          >
            <Text
              style={[
                styles.aiButtonText,
                selectedAI === ai && styles.aiButtonTextSelected,
              ]}
            >
              {ai}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        style={styles.chatArea}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item} />}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  aiSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  aiButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    marginHorizontal: 6,
  },
  aiButtonSelected: {
    backgroundColor: '#fff',
  },
  aiButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  aiButtonTextSelected: {
    color: '#000',
  },
  chatArea: {
    flex: 1,
    marginBottom: 12,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

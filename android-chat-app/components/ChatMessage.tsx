import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'system';
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.userMessage : isSystem ? styles.systemMessage : styles.aiMessage,
      ]}
    >
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#444',
    alignSelf: 'flex-start',
  },
  systemMessage: {
    backgroundColor: '#666',
    alignSelf: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: 16,
  },
});

export default ChatMessage;

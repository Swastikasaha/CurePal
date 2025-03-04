import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import {OPENAI_API_KEY} from '@env';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const CurePalMascot = ({ size = 50 }) => (
  <Svg width={size} height={size} viewBox="0 0 120 120">
    {/* Body */}
    <Path
      d="M30 40 A30 30 0 0 1 90 40 A30 35 0 0 1 90 80 A30 30 0 0 1 30 80 A30 35 0 0 1 30 40"
      fill="#FF6B35"
    />
    {/* Face */}
    <Circle cx="60" cy="60" r="20" fill="#B4E4FF" />
    {/* Eyes */}
    <Circle cx="50" cy="55" r="5" fill="#4CB9E7" />
    <Circle cx="70" cy="55" r="5" fill="#4CB9E7" />
    {/* Chef Hat */}
    <Rect x="45" y="15" width="30" height="10" fill="#FFFFFF" />
    <Path
      d="M45 15 Q60 0 75 15"
      fill="#FFFFFF"
      stroke="#FFFFFF"
      strokeWidth="2"
    />
    {/* Medical Cross on Hat */}
    <Path
      d="M57 10 L63 10 L63 7 L57 7 Z"
      fill="#FF0000"
    />
    <Path
      d="M60 13 L60 4"
      stroke="#FF0000"
      strokeWidth="2"
    />
  </Svg>
);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

  // OpenAI API configuration
  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
  const API_KEY = OPENAI_API_KEY;
  
  useEffect(() => {
    // Scroll to bottom whenever messages update
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message to chat
    const userMessage = {
      _id: Date.now().toString(),
      text,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'You',
      },
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      setIsLoading(true);
      
      // Format conversation history for OpenAI API
      const conversationHistory = messages.map(msg => ({
        role: msg.user._id === 1 ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: text
      });
      
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: conversationHistory,
          max_tokens: 1000,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract response text from OpenAI API
      const botResponse = response.data.choices[0].message.content || 'Sorry, I didn\'t understand that.';

      // Add bot message to chat
      const botMessage = {
        _id: Date.now().toString() + 1,
        text: botResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'CurePal',
        },
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        _id: Date.now().toString() + 1,
        text: 'Oops! Something went wrong. Try again.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'CurePal',
        },
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.user._id === 1;
    
    return (
      <View 
        style={[
          styles.messageBubble, 
          isUser ? styles.userMessage : styles.botMessage
        ]}
      >
        {!isUser && <CurePalMascot size={30} />}
        <Text style={[styles.messageText, isUser ? styles.userMessageText : styles.botMessageText]}>
          {item.text}
        </Text>
        <Text style={styles.timeText}>
          {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.messageList}
          />
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <CurePalMascot size={40} />
              <Text style={styles.loadingText}>CurePal is typing...</Text>
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6', // Match homepage background
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messageList: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0033CC', // Match homepage button color
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#000000',
  },
  timeText: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    margin: 10,
    padding: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 16,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#0033CC', // Match homepage button color
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#0033CC', // Match homepage button color
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default Chatbot;
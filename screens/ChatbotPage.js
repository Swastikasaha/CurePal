import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const ChatbotPage = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const OPENAI_API_KEY = Config.OPENAI_API_KEY;

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      alert('Please enter a medical query.');
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful medical assistant. Provide accurate and concise answers.' },
            { role: 'user', content: prompt },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`, // Replace with actual API key
          },
        }
      );

      setResponse(result.data.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Chatbot</Text>
      <TextInput
        style={styles.input}
        placeholder="Ask a medical question..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Submit'}</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <ScrollView style={styles.responseContainer}>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFEBB2', // Match HomeScreen background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    minHeight: 100,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  responseContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ChatbotPage;

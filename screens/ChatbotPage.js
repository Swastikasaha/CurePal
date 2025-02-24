

import React, { useState } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Replace with your actual Google Gemini API URL and key
  const GEMINI_API_URL = 'https://api.google.com/gemini/chat';
  const API_KEY = 'AIzaSyCYnhmou0WjAG9pQtsFHMYQh6bbNyAYT3Y';

  const handleSend = async (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const message = newMessages[0].text;

    try {
      setIsLoading(true);
      const response = await axios.post(
        GEMINI_API_URL,
        {
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botResponse = response.data.reply || 'Sorry, I didn’t understand that.';
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          {
            _id: Math.random().toString(),
            text: botResponse,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Chatbot',
              avatar: 'https://placeimg.com/140/140/tech',
            },
          },
        ])
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          {
            _id: Math.random().toString(),
            text: 'Oops! Something went wrong. Try again.',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Chatbot',
              avatar: 'https://placeimg.com/140/140/tech',
            },
          },
        ])
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{
          _id: 1,
        }}
        isTyping={isLoading}
      />
      <TextInput
        style={{
          borderBottomWidth: 1,
          margin: 10,
          padding: 5,
        }}
        placeholder="Type a message"
        value={input}
        onChangeText={(text) => setInput(text)}
      />
      <Button
        title="Send"
        onPress={() => {
          handleSend([
            {
              _id: Math.random().toString(),
              text: input,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: 'You',
              },
            },
          ]);
          setInput('');
        }}
      />
    </View>
  );
};

export default Chatbot;


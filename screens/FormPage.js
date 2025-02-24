import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Card, Title, Paragraph } from 'react-native-paper';

const FormPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [diseases, setDiseases] = useState('');
  const [documentUri, setDocumentUri] = useState(null);

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setDocumentUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    console.log({
      name,
      age,
      height,
      weight,
      diseases,
      documentUri,
    });
    // Submit the data to the server or process further here
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Title>Create Your Account</Title>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <TextInput
          style={styles.input}
          placeholder="Height (in cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (in kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Diseases (if any)"
          value={diseases}
          onChangeText={setDiseases}
        />

        <Button title="Upload Medical Document" onPress={handleImagePick} />
        {documentUri && <Image source={{ uri: documentUri }} style={styles.image} />}
        
        <Button title="Submit" onPress={handleSubmit} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default FormPage;

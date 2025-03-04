import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet, 
  Platform 
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const FormPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [diseases, setDiseases] = useState('');
  const [documentUri, setDocumentUri] = useState(null);

  const navigation = useNavigation();

  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      selectionLimit: 1,
      quality: 0.5,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
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
    navigation.navigate("Home");
  };

  return (
    <ScrollView 
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create Your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Height (in cm)"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight (in kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Diseases (if any)"
          value={diseases}
          onChangeText={setDiseases}
          placeholderTextColor="#888"
        />

        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleImagePick}
        >
          <Text style={styles.uploadButtonText}>Upload Medical Document</Text>
        </TouchableOpacity>
        
        {documentUri && (
          <Image 
            source={{ uri: documentUri }} 
            style={styles.image} 
            resizeMode="cover"
          />
        )}
        
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9E6', // Match homepage background
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0033CC', // Match homepage button color
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#0033CC', // Match homepage button color
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#0033CC', // Match homepage button color
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#0033CC', // Match homepage button color
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default FormPage;
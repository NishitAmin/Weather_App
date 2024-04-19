import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Text, View, Image } from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = () => {
    const API_KEY = 'YOUR_API_KEY';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setWeather(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button
        title="Get Weather"
        onPress={getWeather}
      />
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Temperature: {weather.main.temp}°C</Text>
          <Text style={styles.weatherText}>Conditions: {weather.weather[0].main}</Text>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 10,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
});
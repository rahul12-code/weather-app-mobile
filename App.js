import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";

const API_KEY = "aaa31392c8914ac6f00db250866819b6";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    console.log("CITY", city);
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("RESPONSE", response);
      const data = await response.json();
      console.log("DATA", data);
      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError("City not found");
        setWeather(null);
      }
    } catch (err) {
      setError("Something went wrong");
      setWeather(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEATHER APP</Text>
      <View style={styles.datacontainer}>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Enter city name..."
        />
        <Button
          style={styles.button}
          title="Get Weather Data"
          onPress={fetchWeather}
        />
        {error && <Text style={styles.error}>{error}</Text>}

        {/* Displaying Weather Data */}

        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.city}>
              {weather.name}, {weather.sys.country}
            </Text>
            <Text style={styles.temp}>{weather.main.temp}°C</Text>
            <Text style={styles.condition}>
              {weather.weather[0].description}
            </Text>
            <Text style={styles.details}>
              Humidity: {weather.main.humidity}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8ce4fa",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    top: -80,
  },
  datacontainer: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    paddingVertical: 50,
    width: "95%",
    height: "40%",
    // justifyContent:"center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
  details: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default Weather;

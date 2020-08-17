import React, { Component } from "react";
import MapView from "react-native-map-clustering";
import { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import {
  getAllCrimesForLocation,
  getAllCrimesForLocationFullDetails,
} from "../api";
import police from "../assets/police.png";
import fire from "../assets/fire.png";
import bike from "../assets/bike.png";
import violence from "../assets/violence.png";
import fight from "../assets/fight.png";
import thief from "../assets/thief.png";

export default class Map extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
    numberOfNearbyCrimes: 0,
    crimes: [],
  };

  componentDidMount = async () => {
    await this.getCurrentPosition();
    this.getNumberOfCrimes();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.location !== this.state.location) {
      this.getNumberOfCrimes();
    }
  };

  getCurrentPosition = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude, latitudeDelta, longitudeDelta } = coords;
      const location = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
      this.setState({ location }, this.getDetailedCrimes);
    });
  };

  getDetailedCrimes = () => {
    getAllCrimesForLocationFullDetails(
      this.state.location.latitude,
      this.state.location.longitude
    ).then((data) => {
      this.setState({ crimes: data });
    });
  };

  onRegionChange = (location) => {
    this.setState({ location }, this.getDetailedCrimes);
    this.getNumberOfCrimes();
  };

  getNumberOfCrimes = async () => {
    const { location } = this.state;
    const { latitude, longitude } = location;
    const numberOfNearbyCrimes = await getAllCrimesForLocation(
      latitude,
      longitude
    );
    this.setState({ numberOfNearbyCrimes });
  };

  render() {
    const { location, numberOfNearbyCrimes } = this.state;
    const { latitude, longitude } = location;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          // onUserLocationChange={this.getNumberOfCrimes}
          onRegionChangeComplete={this.onRegionChange}
          initialRegion={location}
          // region={location}
          onMapReady={() => {
            if (Platform.OS === "android") {
              PermissionsAndroid.request(
                "android.permission.ACCESS_FINE_LOCATION"
              ).then((granted) => {
                // Alert.alert(granted);
              });
            }
          }}
          zoomEnabled={true}
          zoomControlEnabled={true}
          showsUserLocation={true}
          followsUserLocation={true}
        >
          {this.state.crimes.map((crime) => {
            if (crime) {
              let categoryEmoji = "";
              let image;
              switch (crime.category) {
                case "violent-crime":
                  categoryEmoji = "🔪";
                  image = violence;
                  break;
                case "anti-social-behaviour":
                  categoryEmoji = "🍻";
                  image = fight;
                  break;
                case "criminal-damage-arson":
                  categoryEmoji = "🔥";
                  image = fire;
                  break;
                case "bicycle-theft":
                  categoryEmoji = "🚲";
                  image = bike;
                  break;
                case "burglary":
                  categoryEmoji = "🏃‍♂️";
                  image = thief;
                  break;
                default:
                  categoryEmoji = "🚨";
                  image = police;
                  break;
              }

              return (
                <Marker
                  key={crime.id}
                  coordinate={{
                    latitude: parseFloat(crime.location.latitude),
                    longitude: parseFloat(crime.location.longitude),
                  }}
                  image={image}
                >
                  <Callout tooltip={true} style={styles.textStyle}>
                    <Text>{crime.id.toString()}</Text>
                    <Text>{`${crime.category} ${categoryEmoji}`}</Text>
                  </Callout>
                  {/* {Platform.OS === "ios" ? (
                    
                  ) : null} */}
                </Marker>
              );
            }
          })}
        </MapView>

        <View style={styles.textStyle}>
          <Text>{`lat: ${latitude}`}</Text>
          <Text>{`long: ${longitude}`}</Text>
          <Text>{`crimes within 1 mile: ${numberOfNearbyCrimes}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  textStyle: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 50,
    width: 200,
    borderRadius: 5,
    padding: 5,
  },
});

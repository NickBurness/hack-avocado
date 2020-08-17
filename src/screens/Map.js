import React, { Component } from "react";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
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
import { Tile } from "react-native-elements";

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
            if (crime)
              return (
                <Marker
                  key={crime.id}
                  coordinate={{
                    latitude: crime.location.latitude,
                    longitude: crime.location.longitude,
                  }}
                  title={crime.id}
                  // image={require("../assets/pin.png")}
                >
                  {Platform.OS === "ios" ? (
                    <Callout tooltip={true} style={styles.callout}>
                      <Text style={styles.title}>{title}</Text>
                      <Text style={styles.description}>{description}</Text>
                    </Callout>
                  ) : null}
                </Marker>
              );
          })}
        </MapView>

        <Tile style={styles.textStyle}>
          <Text>{`lat: ${latitude}`}</Text>
          <Text>{`long: ${longitude}`}</Text>
          <Text>{`crimes within 1 mile: ${numberOfNearbyCrimes}`}</Text>
        </Tile>
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
    backgroundColor: "red",
    top: 50,
    width: 200,
  },
});

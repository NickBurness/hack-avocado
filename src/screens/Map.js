import React, { Component } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Text } from "react-native";

export default class Map extends Component {
  state = {
    location: {
      latitude: 0,
      longitude: 0,
    },
  };

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      const { latitude, longitude } = coords;
      const location = {
        latitude: latitude,
        longitude: longitude,
      };
      if (location !== null) this.setState({ location });
    });
  };

  render() {
    const { location } = this.state;
    const { latitude, longitude } = location;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          onUserLocationChange={this.getCurrentPosition}
          showsUserLocation={true}
          followsUserLocation={true}
        />
        <View style={styles.textStyle}>
          <Text>{`lat: ${latitude}`}</Text>
          <Text>{`long: ${longitude}`}</Text>
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
    backgroundColor: "red",
    top: 50,
    width: 200,
  },
});

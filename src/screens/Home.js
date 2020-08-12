import React from "react";
import { Button } from "react-native";

const Home = ({ navigation }) => {
  return (
    <Button
      title="Go to Crime Map"
      onPress={() => navigation.navigate("Map")}
    />
  );
};

export default Home;

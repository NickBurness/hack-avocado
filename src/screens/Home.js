import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { firebaseAuth } from "../firebase/firebase";

const Home = ({ navigation }) => {
  const { replace, navigate } = navigation;
  const currentUser = firebaseAuth.currentUser;

  const logout = () => {
    firebaseAuth.signOut();
    replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>{`Hello ${currentUser.email}`}</Text>
        <Button title="Logout" style={styles.input} onPress={logout} />
      </View>
      <Button title="Go to crime map" onPress={() => navigate("Map")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeContainer: {
    position: "absolute",
    top: 8,
  },
  welcome: { fontSize: 22 },
});

export default Home;

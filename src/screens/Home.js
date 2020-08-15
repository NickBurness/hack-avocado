import React, { Component } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { firebaseAuth, firebaseDb } from "../firebase/firebase";

export default class Home extends Component {
  state = {
    count: 0,
  };

  componentDidMount = () => {
    const currentUser = firebaseAuth.currentUser;
    const dbReference = firebaseDb.ref(`users/${currentUser.uid}/`);

    dbReference.once("value", (snapshot) => {
      if (snapshot.hasChild("username")) {
        dbReference.child("number").once("value", (snapshot) => {
          this.setState({ count: snapshot.val() });
        });
      } else {
        dbReference.set({
          username: currentUser.email,
          number: 0,
        });
      }
    });
  };

  logout = () => {
    const { replace } = this.props.navigation;
    firebaseAuth.signOut();
    replace("Login");
  };

  incrementDatabase = () => {
    const currentUser = firebaseAuth.currentUser;
    const { count } = this.state;
    const newCount = count + 1;
    this.setState({ count: newCount }, () => {
      firebaseDb.ref(`users/${currentUser.uid}`).update({ number: newCount });
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { count } = this.state;
    const currentUser = firebaseAuth.currentUser;

    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcome}>{`Hello ${currentUser.email}`}</Text>
          <Button title="Logout" onPress={this.logout} />
          <Button title="Press me" onPress={this.incrementDatabase} />
          <Text>{`You have pressed me ${count} times`}</Text>
        </View>
        <Button title="Go to crime map" onPress={() => navigate("Map")} />
      </View>
    );
  }
}

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

import React, { Component } from "react";
import { Button, View, TextInput, StyleSheet, Alert } from "react-native";
import { firebaseAuth } from "../firebase/firebase";

export default class Home extends Component {
  state = {
    email: "",
    password: "",
  };

  login = () => {
    const { email, password } = this.state;
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.onLoginSuccess())
      .catch(({ code }) => {
        if (code === "auth/invalid-email") {
          Alert.alert("invalid login");
        }
      });
  };

  onLoginSuccess() {
    const {
      navigation: { replace },
    } = this.props;

    replace("Home");
  }

  render() {
    const TEST_USER_EMAIL = "test@test.com";
    const TEST_USER_PASSWORD = "testtest";
    const { email, password } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(email) => this.setState({ email })}
          label="Email"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(password) => this.setState({ password })}
          label="Password"
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title={"Dev login details"}
          onPress={() =>
            this.setState({
              email: TEST_USER_EMAIL,
              password: TEST_USER_PASSWORD,
            })
          }
        />
        <Button title="Login" style={styles.input} onPress={this.login} />
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
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  inputText: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});

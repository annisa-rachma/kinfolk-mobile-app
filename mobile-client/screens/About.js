import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text>Hello world! this is about</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

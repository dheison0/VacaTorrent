import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loading = ({ msg }) => (
  <View style={style.container}>
    <ActivityIndicator size={54} color="#11E" />
    <Text style={style.text}>{msg}</Text>
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    margin: 15,
    fontSize: 16,
  }
});

export default Loading;
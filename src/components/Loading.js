import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../init";

const Loading = ({ msg }) => (
  <View style={style.container}>
    <ActivityIndicator size={54} color={colors.loadingAndButtons} />
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
    color: colors.text
  }
});

export default Loading;
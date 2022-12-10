import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../init";

const LoadingMore = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.loadingAndButtons} size="large" />
    <Text style={styles.loadingMoreText}>Carregando mais...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 5,
  },
  loadingMoreText: {
    fontSize: 18,
    color: colors.text,
  },
});

export default LoadingMore;

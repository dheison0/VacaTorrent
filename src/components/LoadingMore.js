import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../init";

const LoadingMore = () => (
  <View style={styles.container}>
    <ActivityIndicator color={colors.loading} size="large" />
    <Text style={styles.loadingMoreText}>Carregando mais...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    margin: 8,
  },
  loadingMoreText: {
    marginLeft: 5,
    fontSize: 18,
    color: colors.texts.normal,
  },
});

export default LoadingMore;

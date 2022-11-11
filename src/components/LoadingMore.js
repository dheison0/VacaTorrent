import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Footer = ({ isLoading }) => (
  <>
    {isLoading ? (
      <View style={styles.loadingMore}>
        <ActivityIndicator color="#11E" size="large" />
        <Text style={styles.loadingMoreText}>Carregando mais...</Text>
      </View>
    ) : null}
  </>
);

const styles = StyleSheet.create({
  loadingMore: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  loadingMoreText: {
    fontSize: 18
  }
});

export default Footer;
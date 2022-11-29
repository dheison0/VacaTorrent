import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { colors } from "../init";

const Container = ({ children, thumbnail, onPress }) => (
  <TouchableOpacity style={styles.containerWrap} onPress={onPress}>
    <View style={styles.container}>
      <Image
        style={styles.thumbnail}
        source={{ uri: thumbnail }} />
      {children}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  containerWrap: {
    margin: 8,
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.container
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 125,
    height: 185,
    marginRight: 10,
    borderRadius: 4,
  }
});

export default Container;
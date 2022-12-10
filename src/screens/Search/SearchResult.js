import { View, Text } from "react-native";
import Container from "../../components/Container";
import styles from "./styles";

const SearchResult = ({ item, navigation }) => (
  <Container
    onPress={() => navigation.navigate("Baixar", item)}
    thumbnail={item.thumbnail}
  >
    <View style={styles.informations}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sinopse} numberOfLines={6}>
        {item.sinopse}
      </Text>
    </View>
  </Container>
);

export default SearchResult;

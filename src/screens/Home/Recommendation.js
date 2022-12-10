import { View, Text } from "react-native";
import styles from "./styles";
import Container from "../../components/Container";

const Recommendation = ({ item, navigation }) => (
  <Container
    onPress={() => navigation.navigate("Baixar", item)}
    thumbnail={item.thumbnail}
  >
    <View style={styles.informations}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>
        Idioma: {item.talk_type + "\n"}
        IMDB: {item.imdb + "\n"}
        Ano: {item.year}
      </Text>
    </View>
  </Container>
);

export default Recommendation;

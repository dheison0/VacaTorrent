import { View, Text } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';

const Recommendation = ({ data, onPress }) => (
  <Container onPress={onPress} thumbnail={data.thumbnail}>
    <View style={styles.informations}>
      <Text style={styles.title}>{data.title}</Text>
      <View>
        <Text>Idioma: {data.talk_type}</Text>
        <Text>IMDB: {data.imdb}</Text>
        <Text>Ano: {data.year}</Text>
      </View>
      <View></View>
    </View>
  </Container>
);

export default Recommendation;
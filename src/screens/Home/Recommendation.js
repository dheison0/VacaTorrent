import { View, Text } from 'react-native';
import styles from './styles';
import Container from '../../components/Container';

const Recommendation = ({ data, onPress }) => (
  <Container onPress={onPress} thumbnail={data.thumbnail}>
    <View style={styles.informations}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>
        Idioma: {data.talk_type}{'\n'}
        IMDB: {data.imdb}{'\n'}
        Ano: {data.year}
      </Text>
    </View>
  </Container>
);

export default Recommendation;
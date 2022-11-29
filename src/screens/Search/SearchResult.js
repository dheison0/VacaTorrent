import { View, Text } from 'react-native';
import Container from '../../components/Container';
import styles from './styles';

const SearchResult = ({ data, onPress }) => (
  <Container onPress={onPress} thumbnail={data.thumbnail}>
    <View style={styles.informations}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.sinopse} numberOfLines={6}>
        {data.sinopse}
      </Text>
    </View>
  </Container>
);

export default SearchResult;
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const Recommendation = ({ data, onPress }) => (
  <TouchableOpacity style={styles.containerWrap} onPress={onPress}>
    <View style={styles.container}>
      <Image style={styles.thumbanil} source={{ uri: data.thumbnail }} />
      <View style={styles.informations}>
        <Text style={styles.title}>{data.title}</Text>
        <View>
          <Text>Idioma: {data.talk_type}</Text>
          <Text>IMDB: {data.imdb}</Text>
          <Text>Ano: {data.year}</Text>
        </View>
        <View></View>
      </View>
    </View>
  </TouchableOpacity>
);

export default Recommendation;
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles';

const Recommendation = ({ data, onPress }) => (
  <TouchableHighlight style={styles.containerWrap} onPress={onPress}>
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
  </TouchableHighlight>
);

export default Recommendation;
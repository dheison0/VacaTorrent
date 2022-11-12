import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles';

const SearchResult = ({ data, onPress }) => (
  <TouchableHighlight style={styles.containerWrap} onPress={onPress}>
    <View style={styles.container}>
      <Image style={styles.thumbanil} source={{ uri: data.thumbnail }} />
      <View style={styles.informations}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description} numberOfLines={5}>{data.description}</Text>
      </View>
    </View>
  </TouchableHighlight>
);

export default SearchResult;
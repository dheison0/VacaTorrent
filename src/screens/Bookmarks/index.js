import { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import storage from '../../storage';
import styles from './styles';
import Loading from '../../components/Loading';
import Container from '../../components/Container';

const Bookmark = ({ data, onPress }) => (
  <Container thumbnail={data.thumbnail} onPress={onPress}>
    <View style={styles.flex}>
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.sinopse} numberOfLines={5}>{data.sinopse}</Text>
    </View>
  </Container>
);

class BookmarksScreen extends Component {
  state = {
    isLoading: true,
    bookmarks: [],
    empty: false,
  }
  constructor() {
    super();
  }
  componentDidMount() {
    storage.getBookmarks()
      .then(r => this.setState({
        isLoading: false,
        bookmarks: r,
        empty: r.length == 0
      }));
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state.isLoading ? (
          <Loading msg="Carregando bookmarks..." />
        ) : (
          this.state.empty ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Você não possui filmes/series salvas!</Text>
            </View>
          ) : (
            <FlatList
              data={this.state.bookmarks}
              renderItem={({ item }) => (
                <Bookmark
                  data={item}
                  onPress={() => this.props.navigation.navigate("Baixar", item)}/>
              )}
            />
          )
        )}
      </View>
    );
  };
}

export default BookmarksScreen;
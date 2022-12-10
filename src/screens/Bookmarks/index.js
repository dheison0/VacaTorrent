import { Component } from "react";
import { View, FlatList, Text } from "react-native";
import storage from "../../storage";
import styles from "./styles";
import Loading from "../../components/Loading";
import Container from "../../components/Container";

const Bookmark = ({ item, navigation }) => (
  <Container
    thumbnail={item.thumbnail}
    onPress={() => navigation.navigate("Baixar", item)}
  >
    <View style={styles.flex}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.sinopse} numberOfLines={5}>
        {item.sinopse}
      </Text>
    </View>
  </Container>
);

class BookmarksScreen extends Component {
  state = {
    isLoading: true,
    bookmarks: [],
    empty: false,
  };
  constructor() {
    super();
  }
  componentDidMount() {
    storage.getBookmarks().then((result) =>
      this.setState({
        isLoading: false,
        bookmarks: result,
        empty: result.length == 0,
      })
    );
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state.isLoading ? (
          <Loading msg="Carregando bookmarks..." />
        ) : this.state.empty ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Você não possui filmes/series salvas!
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.bookmarks}
            renderItem={({ item }) => (
              <Bookmark item={item} navigation={this.props.navigation} />
            )}
          />
        )}
      </View>
    );
  }
}

export default BookmarksScreen;

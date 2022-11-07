import { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { url } from '../../vars';
import axios from 'axios';
import styles from './styles.js';
import Loading from '../../components/Loading.js';
import Error from '../../components/Error.js';
import SearchResult from '../../components/SearchResult.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      loadPage: 1,
      stopLoadingMore: false,
      results: [],
    };
    props.navigation.setOptions({ title: `Procurar: ${props.route.params.query}` })
    this.getSearchResults();
  }
  getSearchResults() {
    if (this.state.stopLoadingMore) return;
    this.setState({ isLoadingMore: this.loadPage !== 1 });
    axios.get(
      `${url}/search`,
      {
        params: { page: this.state.loadPage, q: this.props.route.params.query }
      }
    ).then(response => {
      this.setState({
        isLoading: false,
        isLoadingMore: false,
        loadPage: this.state.loadPage + 1,
        results: [...this.state.results, ...response.data.results],
        stopLoadingMore: !response.data.page.has_next,
      });
    }).catch(error => {
      this.setState({
        content: (
          <Error
            msg={`Falha durante a pesquisa!\n${error.toString()}`}
            onRetry={() => this.getSearchResults()}
          />
        )
      });
    });
  }
  render() {
    const renderFooter = () => (
      <>
        {this.state.isLoadingMore ? (
          <View style={styles.loadingMore}>
            <ActivityIndicator color="#11E" size="large" />
            <Text style={styles.loadingMoreText}>Carregando mais...</Text>
          </View>
        ) : null}
      </>
    );
    return (
      <View style={styles.flex}>
        {this.state.isLoading ? (
          <Loading msg="Pesquisando..." />
        ) : (
          <FlatList
            data={this.state.results}
            keyExtractor={({ index }) => index}
            renderItem={({ item }) => (
              <SearchResult
                data={item}
                onPress={() => this.props.navigation.navigate("Baixar", item)}
              />
            )}
            ListFooterComponent={renderFooter}
            onEndReached={() => this.getSearchResults()}
          />
        )
        }
      </View>
    );
  }
}

export default Search;
import { Component } from 'react';
import { FlatList, ToastAndroid, View } from 'react-native';
import { url } from '../../vars';
import axios from 'axios';
import styles from './styles';
import Loading from '../../components/Loading';
import LoadingMore from '../../components/LoadingMore';
import Error from '../../components/Error';
import SearchResult from './SearchResult';

class Search extends Component {
  state = {
    error: null,
    isLoading: true,
    isLoadingMore: false,
    loadPage: 1,
    results: [],
    stopLoadingMore: false,
  }
  constructor(props) {
    super(props);
    props.navigation.setOptions({ title: `Procurar: ${props.route.params.query}` })
    this.getSearchResults();
  }
  reset() {
    this.setState({
      error: null,
      isLoading: true,
      isLoadingMore: false,
      loadPage: 1,
      results: [],
      stopLoadingMore: false,
    });
    this.getSearchResults();
  }
  getSearchResults() {
    if (this.state.stopLoadingMore || this.state.isLoadingMore) {
      return;
    } else if (!this.state.isLoading) {
      this.setState({ isLoadingMore: true });
    }
    axios.get(
      `${url}/search`,
      {
        params: {
          page: this.state.loadPage,
          q: this.props.route.params.query
        }
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
      const errMsg = `Falha durante a pesquisa!\n${error.toString()}`;
      if (this.state.isLoadingMore) {
        ToastAndroid.show(errMsg, ToastAndroid.LONG);
        this.setState({ error: null });
      } else {
        this.setState({ error: errMsg });
      }
      this.setState({
        isLoading: false,
        isLoadingMore: false
      });
    });
  }
  whenLoading() {
    return (<Loading msg="Pesquisando..." />);
  }
  onError() {
    return (
      <Error msg={this.state.error} onRetry={() => this.reset()} />
    );
  }
  onSuccess() {
    return (
      <FlatList
        data={this.state.results}
        renderItem={({ item }) => (
          <SearchResult
            data={item}
            onPress={() => this.props.navigation.navigate("Baixar", item)}
          />
        )}
        ListFooterComponent={(
          <LoadingMore isLoading={this.state.isLoadingMore} />
        )}
        onEndReached={() => this.getSearchResults()}
      />
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? this.whenLoading() : (
          this.state.error ? this.onError() : this.onSuccess()
        )}
      </View>
    );
  }
}

export default Search;
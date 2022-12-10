import { Component } from "react";
import { FlatList, ToastAndroid, View } from "react-native";
import { apiServerURL } from "../../init";
import axios from "axios";
import Loading from "../../components/Loading";
import LoadingMore from "../../components/LoadingMore";
import Error from "../../components/Error";
import SearchResult from "./SearchResult";

class Search extends Component {
  defaultState = {
    error: null,
    isLoading: true,
    isLoadingMore: false,
    page: 1,
    results: [],
    stopLoadingMore: false,
  };
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
    props.navigation.setOptions({
      title: `Procurar: ${props.route.params.query}`,
    });
  }
  componentDidMount() {
    this.getSearchResults();
  }
  reset() {
    this.setState({ ...this.defaultState });
    this.getSearchResults();
  }
  async getSearchResults() {
    if (this.state.stopLoadingMore || this.state.isLoadingMore) {
      return;
    } else if (!this.state.isLoading) {
      this.setState({ isLoadingMore: true });
    }
    let response;
    try {
      response = await axios.get(`${apiServerURL}/search`, {
        params: {
          page: this.state.page,
          q: this.props.route.params.query,
        },
      });
    } catch (error) {
      let errorMessage = `Falha durante a pesquisa!\n`;
      errorMessage += `Erro ${error.response.status}: ${error.response.data.error}`;
      if (this.state.isLoadingMore) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        this.setState({ error: null });
      } else {
        this.setState({ error: errorMessage });
      }
      this.setState({
        isLoading: false,
        isLoadingMore: false,
      });
    }
    this.setState({
      isLoading: false,
      isLoadingMore: false,
      page: this.state.page + 1,
      results: [...this.state.results, ...response.data.results],
      stopLoadingMore: !response.data.page.has_next,
    });
  }
  render() {
    const searchFooter = () => (
      <>{this.state.isLoadingMore ? <LoadingMore /> : null}</>
    );
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading ? (
          <Loading msg="Pesquisando..." />
        ) : this.state.error ? (
          <Error msg={this.state.error} onRetry={() => this.reset()} />
        ) : (
          <FlatList
            data={this.state.results}
            renderItem={({ item }) => (
              <SearchResult item={item} navigation={this.props.navigation} />
            )}
            ListFooterComponent={searchFooter}
            onEndReached={() => this.getSearchResults()}
          />
        )}
      </View>
    );
  }
}

export default Search;

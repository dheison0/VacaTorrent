import { Component } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, apiServerURL } from "../../init";
import axios from "axios";
import styles from "./styles";
import SearchBox from "./SearchBox";
import Loading from "../../components/Loading";
import LoadingMore from "../../components/LoadingMore";
import Recommendation from "./Recommendation";
import Error from "../../components/Error";

const Bookmarks = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Bookmarks")}>
    <Image
      source={require("../../../assets/bookmarked.png")}
      style={{ width: 18, height: 18 }}
      tintColor={colors.images}
    />
  </TouchableOpacity>
);

class Home extends Component {
  defaultState = {
    error: null,
    isLoading: true,
    isLoadingMore: false,
    page: 1,
    results: [],
  };
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState };
    this.props.navigation.setOptions({
      headerRight: () => <Bookmarks navigation={this.props.navigation} />,
    });
  }
  componentDidMount() {
    this.updateRecommendedList();
  }
  reset() {
    this.setState({ ...this.defaultState });
    this.updateRecommendedList();
  }
  async updateRecommendedList() {
    if (!this.state.isLoading) {
      this.setState({ isLoadingMore: true });
    }
    let response;
    try {
      response = await axios.get(`${apiServerURL}/home/${this.state.page}`, {
        timeout: 10000,
      });
    } catch (error) {
      let errorMessage = `Não foi possivel obter a lista de recomendados!\n`;
      errorMessage += `Erro ${error.response.status}: ${error.message}`;
      if (this.state.isLoadingMore) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        this.setState({ error: errorMessage });
      }
      this.setState({
        isLoading: false,
        isLoadingMore: false,
      });
      return;
    }
    this.setState({
      error: null,
      isLoading: false,
      isLoadingMore: false,
      page: this.state.page + 1,
      results: [...this.state.results, ...response.data],
    });
  }
  render() {
    const renderRecommendation = ({ item }) => (
      <Recommendation item={item} navigation={this.props.navigation} />
    );
    const listFooter = () => (
      <>{this.state.isLoadingMore ? <LoadingMore /> : null}</>
    );
    return (
      <View style={styles.root}>
        {this.state.isLoading ? (
          <Loading msg="Carregando recomendados..." />
        ) : this.state.error ? (
          <Error msg={this.state.error} onRetry={() => this.reset()} />
        ) : (
          <>
            <SearchBox navigation={this.props.navigation} />
            <FlatList
              data={this.state.results}
              renderItem={renderRecommendation}
              refreshControl={<RefreshControl onRefresh={() => this.reset()} />}
              ListFooterComponent={listFooter}
              onEndReached={() => this.updateRecommendedList()}
            />
          </>
        )}
      </View>
    );
  }
}

export default Home;

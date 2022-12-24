import { Component } from "react";
import {
  FlatList,
  Image,
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
      tintColor={colors.buttons.icons}
    />
  </TouchableOpacity>
);

class Home extends Component {
  defaultState = {
    error: null,
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
    this.reachMoreRecommendations();
  }
  reset() {
    this.setState({ ...this.defaultState });
    this.reachMoreRecommendations();
  }
  async reachMoreRecommendations() {
    let response;
    try {
      response = await axios.get(
        `${apiServerURL}/home/${this.state.page}`,
        { timeout: 10000 }
      );
    } catch (err) {
      let errorMessage = `Não foi possivel obter a lista de recomendados!\n`;
      if (!err.response) {
        errorMessage += `Servidor não alcançado a tempo.`;
      } else if (err.response.status == 500) {
        errorMessage += `Erro 500: Ocorreu um problema interno na API`;
      } else {
        errorMessage += `Erro ${err.response.status}: ${err.response.data.error}`;
      }
      if (this.state.isLoadingMore) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
      } else {
        this.setState({ error: errorMessage });
      }
      return;
    }
    this.setState({
      page: this.state.page + 1,
      results: [...this.state.results, ...response.data],
    });
  }
  render() {
    const renderRecommendation = ({ item }) => (
      <Recommendation item={item} navigation={this.props.navigation} />
    );
    return (
      <View style={styles.root}>
        <SearchBox navigation={this.props.navigation} />
        {this.state.results.length == 0 ? (
          <Loading msg="Carregando lista de recommendados..." />
        ) : (this.state.error != null ? (
          <Error msg={this.state.error} onRetry={() => this.reset()} />
        ) : (
          <FlatList
            data={this.state.results}
            renderItem={renderRecommendation}
            ListFooterComponent={LoadingMore}
            onEndReachedThreshold={0.5}
            onEndReached={() => this.reachMoreRecommendations()}
            onRefresh={() => this.reset()}
            refreshing={false}
          />
        ))}
      </View>
    );
  }
}

export default Home;

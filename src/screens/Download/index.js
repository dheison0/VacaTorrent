import { Component } from "react";
import { ScrollView, Text, Image, View } from "react-native";
import { colors, apiServerURL } from "../../init";
import axios from "axios";
import styles from "./styles";
import BookmarkButton from "./BookmarkButton";
import LinkButtons from "./LinkButtons";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const IMDB = ({ rating }) => (
  <View style={styles.imdb}>
    <Image
      style={{ width: 26, height: 26 }}
      tintColor={colors.images}
      source={require("../../../assets/star.png")}
    />
    <Text style={styles.imdbRating}>{rating}</Text>
  </View>
);

const Download = ({ data }) => (
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.base}>
        <Image style={styles.thumbnail} source={{ uri: data.thumbnail }} />
        <Text style={styles.title}>{data.title}</Text>
        {data.imdb > 0 ? <IMDB rating={data.imdb} /> : null}
      </View>
      <Text style={styles.sinopse}>{data.sinopse}</Text>
      {data.links.map((v, k) => (
        <LinkButtons item={v} key={k} />
      ))}
    </View>
  </ScrollView>
);

class DownloadScreen extends Component {
  state = {
    error: null,
    isLoading: true,
    result: null,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getMovieInformations();
  }
  async getMovieInformations() {
    this.setState({ isLoading: true });
    let response;
    try {
      response = await axios.get(
        `${apiServerURL}/download/${this.props.route.params.url}`,
        {
          timeout: 10000,
        }
      );
    } catch (error) {
      this.setState({
        isLoading: false,
        error: `Erro obtendo informações de download:\n${error.toString()}`,
      });
      return;
    }
    this.setState({
      isLoading: false,
      result: response.data,
    });
    this.props.navigation.setOptions({
      headerRight: () => (
        <BookmarkButton
          data={{
            ...response.data,
            url: this.props.route.params.url,
            links: undefined,
          }}
        />
      ),
    });
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state.isLoading ? (
          <Loading msg="Buscando informações..." />
        ) : this.state.error ? (
          <Error
            msg={this.state.error}
            onRetry={() => this.getMovieInformations()}
          />
        ) : (
          <Download data={this.state.result} />
        )}
      </View>
    );
  }
}

export default DownloadScreen;

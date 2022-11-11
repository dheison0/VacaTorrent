import { Component } from 'react';
import { Button, ScrollView, Text, Image, View, Linking, ToastAndroid, FlatList } from 'react-native';
import { url } from '../../vars.js';
import axios from 'axios';
import styles from './styles.js';
import Loading from '../../components/Loading.js';
import Error from '../../components/Error.js';

const IMDB = ({ rating }) => (
  <View style={styles.imdb}>
    <Image
      style={{ width: 26, height: 26 }}
      source={require('../../../assets/star.png')}
    />
    <Text style={styles.imdbRating}>{rating}</Text>
  </View>
);

const LinkButton = ({ item }) => (
  <View style={styles.link}>
    <Button
      title={item.title}
      onPress={() => {
        Linking.openURL(item.url).catch(() => ToastAndroid.show(
          "Não foi possivel abrir o link!\nTalvez você não possua nenhum app compativel com Torrent",
          ToastAndroid.LONG
        ))
      }}
    />
  </View>
);

const Download = ({ data }) => (
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.base}>
        <Image style={styles.thumbnail} source={{ uri: data.thumbnail }} />
        <Text style={styles.title}>{data.title}</Text>
        {data.imdb > 0 ? (<IMDB rating={data.imdb} />) : null}
      </View>
      <Text style={styles.sinopse}>{data.sinopse}</Text>
      <FlatList
        data={data.links}
        renderItem={LinkButton}
      />
    </View>
  </ScrollView>
);

class DownloadScreen extends Component {
  state = {
    error: null,
    isLoading: true,
    result: null,
  }
  constructor(props) {
    super(props);
    this.getMovieInformations();
  }
  getMovieInformations() {
    this.setState({ isLoading: true });
    axios.get(
      `${url}/download/${this.props.route.params.url}`,
      { timeout: 10000 }
    ).then(response => {
      this.setState({
        isLoading: false,
        result: response.data,
      });
    }).catch(error => {
      this.setState({
        isLoading: false,
        error: `Erro obtendo informações de download:\n${error.toString()}`
      });
    });
  }
  whenLoading() {
    return (<Loading msg="Buscando informações..." />);
  }
  onSuccess() {
    return (<Download data={this.state.result} />);
  }
  onError() {
    return (
      <Error
        msg={this.state.error}
        onRetry={() => this.getMovieInformations()}
      />
    )
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

export default DownloadScreen;
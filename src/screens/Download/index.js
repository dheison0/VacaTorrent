import { Component } from 'react';
import { Button, ScrollView, Text, Image, View, Linking, ToastAndroid } from 'react-native';
import { url } from '../../vars.js';
import axios from 'axios';
import styles from './styles.js';
import Loading from '../../components/Loading.js';
import Error from '../../components/Error.js';

const Download = ({ data }) => (
  <ScrollView style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.base}>
        <Image style={styles.thumbnail} source={{ uri: data.thumbnail }} />
        <Text style={styles.title}>{data.title}</Text>
        {(() => {
          if (data.imdb > 0) {
            return (
              <View style={styles.imdb}>
                <Image
                  style={{ width: 26, height: 26 }}
                  source={require('../../../assets/star.png')}
                />
                <Text style={styles.imdbRating}>{data.imdb}</Text>
              </View>
            );
          }
        })()}
      </View>
      <Text style={styles.sinopse}>{data.sinopse}</Text>
      {data.links.map((link, index) => (
        <View style={styles.link} key={index}>
          <Button
            title={link.title}
            onPress={() => {
              Linking.openURL(link.url).catch(() => ToastAndroid.show(
                "Não foi possivel abrir o link!\nTalvez você não possua nenhum app compativel com Torrent",
                ToastAndroid.LONG
              ))
            }}
          />
        </View>
      ))}
    </View>
  </ScrollView>
);

class DownloadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { content: (<Loading msg="Buscando informações..." />) };
    this.getMovieInformations();
  }
  getMovieInformations() {
    this.setState({ content: (<Loading msg="Buscando informações..." />) });
    axios.get(
      `${url}/download/${this.props.route.params.url}`,
      { timeout: 10000 }
    ).then(response => {
      this.setState({ content: (<Download data={response.data} />) });
    }).catch(error => {
      this.setState({
        content: (
          <Error
            msg={`Erro obtendo informações de download:\n${error.toString()}`}
            onRetry={() => this.getMovieInformations()}
          />
        )
      });
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.content}
      </View>
    );
  }
}

export default DownloadScreen;
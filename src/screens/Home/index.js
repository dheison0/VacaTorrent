import { Component, useState } from 'react';
import {
  Button, FlatList, View, RefreshControl, Image,
  TextInput, ToastAndroid, TouchableOpacity
} from 'react-native';
import { url } from '../../vars';
import axios from 'axios';
import styles from './styles';
import Loading from '../../components/Loading';
import LoadingMore from '../../components/LoadingMore';
import Recommendation from './Recommendation';
import Error from '../../components/Error';

const SearchBox = ({ navigation }) => {
  const [input, setInput] = useState('');
  const search = () => {
    if (input.trim() == '') {
      ToastAndroid.show('Preencha o campo de pesquisa antes...', ToastAndroid.SHORT);
    } else {
      navigation.navigate('Procurar', { query: input });
    }
  }
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='O que você deseja?'
        onChangeText={text => setInput(text)}
        onEndEditing={search}
      />
      <Button title="Procurar" onPress={search} />
    </View>
  );
};

const Bookmarks = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Bookmarks')}>
    <Image
      alt="Salvos"
      style={{ width: 18, height: 18 }}
      source={require('../../../assets/bookmarked.png')} />
  </TouchableOpacity>
);

class Home extends Component {
  state = {
    error: null,
    isLoading: true,
    isLoadingMore: false,
    results: [],
    loadPage: 1,
  }
  constructor(props) {
    super(props);
    this.updateRecommendedList();
    this.props.navigation.setOptions({
      headerRight: () => (<Bookmarks navigation={this.props.navigation} />)
    });
  }
  reset() {
    this.setState({
      error: null,
      isLoading: true,
      isLoadingMore: false,
      results: [],
      loadPage: 1,
    });
    this.updateRecommendedList();
  }
  async updateRecommendedList() {
    if (!this.state.isLoading) {
      this.setState({ isLoadingMore: true });
    }
    axios.get(`${url}/${this.state.loadPage}`, { timeout: 10000 })
      .then(response => {
        this.setState({
          error: null,
          isLoading: false,
          isLoadingMore: false,
          loadPage: this.state.loadPage + 1,
          results: [...this.state.results, ...response.data],
        });
      }).catch(error => {
        const errMsg = `Não foi possivel obter a lista de recomendados!\n${error.toString()}`;
        if (this.state.isLoadingMore) {
          ToastAndroid.show(errMsg, ToastAndroid.LONG);
        } else {
          this.setState({ error: errMsg });
        }
        this.setState({
          isLoading: false,
          isLoadingMore: false,
        });
      });
  }
  onSuccess() {
    return (
      <>
        <SearchBox navigation={this.props.navigation} />
        <FlatList
          data={this.state.results}
          renderItem={({ item }) => (
            <Recommendation
              data={item}
              onPress={() => this.props.navigation.navigate("Baixar", item)}
            />
          )}
          refreshControl={(<RefreshControl onRefresh={() => this.reset()} />)}
          ListFooterComponent={(
            <LoadingMore isLoading={this.state.isLoadingMore} />
          )}
          onEndReached={() => this.updateRecommendedList()}
        />
      </>
    );
  }
  onError() {
    return (
      <Error msg={this.state.error} onRetry={() => this.reset()} />
    );
  }
  whenLoading() {
    return (
      <Loading msg="Carregando recomendados..." />
    );
  }
  render() {
    return (
      <View style={styles.root}>
        {this.state.isLoading ? this.whenLoading() : (
          this.state.error ? this.onError() : this.onSuccess())}
      </View>
    )
  }
}

export default Home;
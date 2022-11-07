import { Component, useState } from 'react';
import {
  Button, FlatList, View, RefreshControl,
  TextInput, ToastAndroid
} from 'react-native';
import { url } from '../../vars.js';
import axios from 'axios';
import styles from './styles.js';
import Loading from '../../components/Loading.js';
import Recommendation from '../../components/Recommendation.js';
import Error from '../../components/Error.js';

const SearchBox = ({ navigation }) => {
  const [input, setInput] = useState('');
  const search = () => {
    if (input.trim() == '') {
      ToastAndroid.show('Preencha o campo de pesquisa antes...', ToastAndroid.SHORT)
    } else {
      navigation.navigate('Procurar', { query: input });
    }
  }
  return (
    <View style={styles.container}>
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { content: (<Loading msg="Carregando lista..." />) };
    this.updateRecommendedList();
  }
  async updateRecommendedList() {
    this.setState({ content: (<Loading msg="Carregando lista..." />) });
    axios.get(url, { timeout: 10000 }).then(response => {
      this.setState({
        content: (
          <>
            <SearchBox navigation={this.props.navigation} />
            <FlatList
              data={response.data}
              renderItem={({ item }) => (
                <Recommendation
                  data={item}
                  onPress={() => this.props.navigation.navigate("Baixar", item)}
                />
              )}
              refreshControl={(
                <RefreshControl onRefresh={() => this.updateRecommendedList()} />
              )}
            />
          </>
        )
      })
    }).catch(error => {
      this.setState({
        content: (
          <Error
            msg={`Não foi possivel obter a lista de recomendados!\n${error.toString()}`}
            onRetry={() => this.updateRecommendedList()}
          />
        )
      });
    });
  }
  render() {
    return (
      <View style={styles.flex}>
        {this.state.content}
      </View>
    )
  }
}

export default Home;
import { Component, useState } from 'react';
import { View, Button, TextInput, ToastAndroid, ScrollView, RefreshControl } from 'react-native';
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
    axios.get(url, { timeout: 10000 }).then(result => {
      this.setState({
        content: (
          <ScrollView
            style={styles.flex}
            refreshControl={(
              <RefreshControl onRefresh={() => this.updateRecommendedList()} />
            )}
          >
            <SearchBox navigation={this.props.navigation} />
            {result.data.map((rec, index) => (
              <Recommendation
                data={rec}
                onPress={() => this.props.navigation.navigate("Baixar", rec)}
                key={index}
              />
            ))}
          </ScrollView>
        )
      });
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
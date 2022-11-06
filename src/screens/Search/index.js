import { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { url } from '../../vars';
import axios from 'axios';
import styles from './styles.js';
import Loading from '../../components/Loading.js';
import Error from '../../components/Error.js';
import SearchResult from '../../components/SearchResult.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { content: (<Loading msg="Pesquisando..." />) };
    props.navigation.setOptions({ title: `Procurar: ${props.route.params.query}` })
    this.getSearchResults();
  }
  getSearchResults() {
    this.setState({ content: (<Loading msg="Pesquisando..." />) });
    axios.get(
      `${url}/search`,
      { params: { q: this.props.route.params.query } }
    ).then(result => {
      this.setState({
        content: (
          <ScrollView>
            {result.data.results.map((res, index) => (
              <SearchResult
                data={res}
                key={index}
                onPress={() => this.props.navigation.navigate("Baixar", res)}
              />
            ))}
          </ScrollView>
        )
      })
    }).catch(error => {
      this.setState({
        content: (
          <Error
            msg={`Falha durante a pesquisa!\n${error.toString()}`}
            onRetry={() => this.getSearchResults()}
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
    );
  }
}

export default Search;
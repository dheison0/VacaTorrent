import { Button, Image, Text, StyleSheet, View } from 'react-native';

const Error = ({ msg, onRetry }) => (
  <View style={style.container}>
    <Image style={style.image} source={require('../../assets/warning.png')} />
    <Text style={style.error}>{msg}</Text>
    <Button title="Tentar novamente" onPress={onRetry} />
  </View>
);

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 185,
    height: 154,
  },
  error: {
    fontSize: 16,
    margin: 15
  }
});

export default Error;
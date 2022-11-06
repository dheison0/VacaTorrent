import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    margin: 10,
    borderRadius: 10,
    width: 220,
    height: 325
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 15
  },
  sinopse: {
    fontSize: 16,
    margin: 10,
    marginBottom: 20
  },
  link: {
    flex: 1,
    margin: 10,
  },
  imdb: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imdbRating: {
    fontSize: 16
  }
});

export default styles
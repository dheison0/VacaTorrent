import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerWrap: {
    backgroundColor: '#A9F0D1',
    borderColor: '#A9F0D1',
    margin: 8,
    borderWidth: 6,
    borderRadius: 5,
    padding: 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  thumbanil: {
    width: 125,
    height: 185,
    marginRight: 5,
    borderRadius: 4,
  },
  informations: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5
  },
  description: {
    margin: 3
  }
});

export default styles;
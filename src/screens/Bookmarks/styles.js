import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bookmark: {
    backgroundColor: '#CCC',
    margin: 8,
    padding: 5,
    borderRadius: 5,
    flexDirection: 'row'
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  sinopse: {
    margin: 4
  },
  saved: {
    alignItems: 'flex-end'
  }
});

export default styles;
import { StyleSheet } from "react-native";
import { colors } from '../../vars';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 4,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#95adbe',
    borderRadius: 3
  },
  informations: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5
  }
});

export default styles;
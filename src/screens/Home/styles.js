import { StyleSheet } from "react-native";
import { colors } from "../../init";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    margin: 15,
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 4,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: colors.inputBorder,
    color: colors.text,
  },
  informations: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: colors.text,
  },
  description: {
    flex: 1,
    color: colors.description,
  },
});

export default styles;

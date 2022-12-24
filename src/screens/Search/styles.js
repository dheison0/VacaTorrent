import { StyleSheet } from "react-native";
import { colors } from "../../init";

const styles = StyleSheet.create({
  informations: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: colors.texts.normal,
  },
  sinopse: {
    flex: 1,
    margin: 3,
    color: colors.texts.sinopse,
  },
});

export default styles;

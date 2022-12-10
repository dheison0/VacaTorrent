import { View, Linking, ToastAndroid, Button } from "react-native";
import * as Clipboard from "expo-clipboard";
import { colors } from "../../init";
import styles from "./styles";

const LinkButtons = ({ item }) => (
  <View style={styles.link}>
    <Button
      title={item.title}
      color={colors.loadingAndButtons}
      onPress={() => {
        Linking.openURL(item.url).catch(() =>
          ToastAndroid.show(
            "Não foi possivel abrir o link!\n" +
              "Talvez você não possua nenhum app compativel com Torrent",
            ToastAndroid.LONG
          )
        );
      }}
    />
    <Button
      title="Copy"
      onPress={async () => {
        try {
          await Clipboard.setStringAsync(item.url);
        } catch {
          ToastAndroid.show("Falha ao copiar link!", ToastAndroid.SHORT);
        }
        ToastAndroid.show(
          "Link magnetico copiado para aréa de transferencia!",
          ToastAndroid.SHORT
        );
      }}
    />
  </View>
);

export default LinkButtons;

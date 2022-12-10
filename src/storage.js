import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {};

storage.addBookmark = async (title, data) => {
  const dataString = JSON.stringify({
    ...data,
    timestamp: new Date().getTime(),
  });
  await AsyncStorage.setItem(`@bookmark:${title}`, dataString);
};

storage.isBookmarked = async (title) => {
  let data = await AsyncStorage.getItem(`@bookmark:${title}`);
  return data != null;
};

storage.getBookmarks = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const bookmarks = keys.filter((k) => k.startsWith("@bookmark"));
  const bookmarksData = await Promise.all(
    bookmarks.map(async (k) => {
      const data = await AsyncStorage.getItem(k);
      return JSON.parse(data);
    })
  );
  bookmarksData.sort((a, b) => (a.timestamp < b.timestamp ? 0 : -1));
  return bookmarksData;
};

storage.removeBookmark = async (title) => {
  await AsyncStorage.removeItem(`@bookmark:${title}`);
};

export default storage;

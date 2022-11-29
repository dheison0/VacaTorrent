import AsyncStorage from '@react-native-async-storage/async-storage';

const exp = {}

exp.addBookmark = async (title, data) => {
  const dataString = JSON.stringify({
    ...data,
    timestamp: new Date().getTime()
  });
  await AsyncStorage.setItem(`@bookmark:${title}`, dataString);
};

exp.isBookmarked = async (title) => {
  let data = await AsyncStorage.getItem(`@bookmark:${title}`);
  return data != null;
};

exp.getBookmarks = async () => {
  const keys = await AsyncStorage.getAllKeys();
  const bookmarks = keys.filter((k) => k.startsWith('@bookmark'))
  const bookmarksData = await Promise.all(bookmarks.map(async (k) => {
    const data = await AsyncStorage.getItem(k);
    return JSON.parse(data);
  }));
  bookmarksData.sort((a, b) => a.timestamp < b.timestamp ? 0 : -1);
  return bookmarksData;
};

exp.removeBookmark = async (title) => {
  await AsyncStorage.removeItem(`@bookmark:${title}`);
}

export default exp;
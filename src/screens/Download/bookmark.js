import { useState } from 'react';
import { TouchableOpacity, Image, ToastAndroid } from 'react-native';
import storage from '../../storage';

const img = {
  mark: require('../../../assets/bookmark.png'),
  marked: require('../../../assets/bookmarked.png')
}

function BookmarkButton({ data }) {
  const [isBookmarked, setBookmarked] = useState(false);
  storage.isBookmarked(data.title).then(r => setBookmarked(r));
  const buttonPressed = async () => {
    if (!isBookmarked) {
      await storage.addBookmark(data.title, data);
      ToastAndroid.show("Salvo nos bookmarks!", ToastAndroid.SHORT);
    } else {
      await storage.removeBookmark(data.title);
      ToastAndroid.show("Removido dos bookmarks!", ToastAndroid.SHORT);
    }
    const isMarked = await storage.isBookmarked(data.title);
    setBookmarked(isMarked);
  };
  return (
    <TouchableOpacity onPress={() => buttonPressed()}>
      <Image
        source={isBookmarked ? img.marked : img.mark}
        style={{ width: 18, height: 18 }}
      />
    </TouchableOpacity>
  )
}

export default BookmarkButton;
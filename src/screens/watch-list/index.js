import React, {useState, useRef, useEffect} from 'react';
import {Animated, Dimensions, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SwipeListView} from 'react-native-swipe-list-view';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import Header from '../../components/header';
import HypeItem from '../../components/hype-item';
import {listWatchlist, removeWatchlist} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';

const rowTranslateAnimatedValues = {};
Array(20)
  .fill('')
  .forEach((_, i) => {
    rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
  });

export default function HypeList({route}) {
  const [isLoading, setLoading] = useState(true);
  const [listData, setListData] = useState([]);
  const callbackRefresh = route.params?.callbackRefresh;

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await listWatchlist();
      setLoading(false);
      const normalizeData = res.data.data.map((item, index) => ({
        key: index.toString(),
        ...item,
      }));
      setListData(normalizeData);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      if (typeof callbackRefresh === 'function') callbackRefresh(true);
    };
  }, []);

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (
      value < -Dimensions.get('window').width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(async () => {
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setListData(newData);
        const removeId = listData[prevIndex].product.uuid;
        console.log('Check id:', removeId);
        removeWatchlist(removeId);
        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = ({item}) => <HypeItem item={item} fetchData={fetchData} />;

  const renderHiddenItem = () => (
    <View style={styles.ctnHidden}>
      <AntDesign name="delete" color="#fff" size={moderateScale(30)} />
    </View>
  );

  return (
    <View style={styles.ctnRoot}>
      <Header title="Hypelist" />
      {listData.length > 0 && (
        <View style={styles.ctnInfo}>
          <Text style={styles.txtInfo}>
            To delete projects just swipe left on them.
          </Text>
        </View>
      )}
      <SwipeListView
        contentContainerStyle={styles.ctnScroll}
        disableRightSwipe
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        ListEmptyComponent={() => {
          if (!isLoading) {
            return (
              <View style={styles.ctnEmpty}>
                <Text style={styles.txtEmpty}>Your hypelist is empty.</Text>
              </View>
            );
          }
          return null;
        }}
        ListFooterComponent={() => {
          if (isLoading) {
            return <LoadingIndicator fullscreen stylesRoot={{marginTop: 20}} />;
          }
          return null;
        }}
        useNativeDriver={false}
      />
    </View>
  );
}

import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import {connect} from 'react-redux';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import NFTCard from '../../components/nft-card';
import {reset} from '../../helpers/navigationRef';
import {getProduct} from '../../helpers/requests';
import styles from './styles';
import {getDimensionWidth} from '../../helpers/getDimensions';
import {getFutureDate} from '../../helpers/dateHelper';
import states from './states';
import {stringToNumber} from '../../helpers/parseNumber';
import dispacher from './dispatcher';
import {eventTracking, SWYPE_COLLECTION_ID} from '../../shared/eventTracking';

function DiscoverNFT({navigation, userProfile, listHype, setHypeList}) {
  const [isLoading, setLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(false);
  const [listData, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [loadingMore, setLoadMore] = useState();
  let carouselRef = null;

  const selectAmountHype = id => {
    const getItem = listHype.find(item => item.idProject === id);
    // console.log('Cehck value getItem', getItem);
    return getItem;
  };

  const handleHypeList = res => {
    if (res.length > 0) {
      if (listHype.length > 0) {
        const hypeData = res.map(item => {
          if (!selectAmountHype(item.uuid)?.currentAmount) {
            return {
              idProject: item.uuid,
              currentAmount: Math.round(stringToNumber(item.nft_type) / 3),
              dateAdded: Date.now(),
            };
          }
          return selectAmountHype(item.uuid);
        });
        setHypeList(hypeData);
      } else {
        const hypeData = [];
        res.forEach(item => {
          hypeData.push({
            idProject: item.uuid,
            currentAmount: Math.round(stringToNumber(item.nft_type) / 3),
            dateAdded: Date.now(),
          });
        });
        setHypeList(hypeData);
      }
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProduct({length: 12, page: currentPage});
      setTotalItem(res.data.total);
      setData(res.data.data);
      handleHypeList(res.data.data);
      setLoading(false);
    } catch (err) {
      reset('BoardingPage');
    }
  };

  const handleRefresh = async (noDirectItem = false) => {
    try {
      setRefresh(true);
      if (!noDirectItem) {
        carouselRef.snapToItem(0);
      }
      setPage(1);
      const res = await getProduct({length: 12, page: 1});
      setTotalItem(res.data.total);
      setData(res.data.data);
      setRefresh(false);
    } catch (err) {
      console.log('Error refresh:', err);
      setRefresh(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      console.log('Load more run:', currentPage);
      setLoadMore(true);
      const res = await getProduct({length: 12, page: currentPage});
      setTotalItem(res.data.total);
      setData([...listData, ...res.data.data]);
      setLoadMore(false);
    } catch (err) {
      console.log('Error refresh:', err);
      setLoadMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listData.length && !isRefresh) {
      handleLoadMore();
    }
  }, [currentPage]);

  useEffect(() => {
    console.log(
      'Listen activeSlide:',
      activeSlide,
      activeSlide >= listData.length - 1,
    );
    if (activeSlide >= listData.length - 1) {
      if (listData.length < totalItem) {
        if (!loadingMore) {
          setPage(2);
        }
      }
    }
  }, [activeSlide]);

  function getDateItem() {
    if (listData?.length > 0 && listData[activeSlide]) {
      const getYesterdayDate = getFutureDate(-1);
      const getToday = getFutureDate(0);
      const itemDate = moment(listData[activeSlide].nft_publish_date).format(
        'YYYY-MM-DD',
      );
      if (itemDate === getYesterdayDate) {
        return 'Yesterday.';
      }
      if (itemDate === getToday) {
        return 'Today.';
      }
      return moment(listData[activeSlide].nft_publish_date).format(
        'DD.MM.YYYY',
      );
    }
    return '';
  }

  function renderTitle() {
    return (
      <View style={styles.ctnTitle}>
        <Text style={styles.txtName}>{`Hi ${
          userProfile?.data?.name || ''
        },`}</Text>
        <Text style={styles.txtTitle}>Here is our pick</Text>
        <Text style={styles.txtDayTitle}>{`for ${getDateItem()}`}</Text>
      </View>
    );
  }

  function renderCard() {
    const getDefaultColor = () => ({
      backgroundColor: listData[activeSlide].preferance.background_color,
    });
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.overalyWrapper}>
          <View style={[styles.overlay, getDefaultColor(), styles.mgMin8]} />
          <View style={[styles.overlay, getDefaultColor(), styles.mgMin4]} />
          <View style={[styles.overlay, getDefaultColor()]} />
        </View>
        <View style={styles.carouselWrapper}>
          <Carousel
            layout="tinder"
            layoutCardOffset={9}
            data={listData}
            extraData={listData}
            renderItem={({item, index}) => (
              <NFTCard
                handleRefresh={handleRefresh}
                isActive={index === activeSlide}
                item={item}
                selectAmountHype={selectAmountHype}
              />
            )}
            keyExtractor={item => item.uuid}
            sliderWidth={getDimensionWidth(1)}
            itemWidth={getDimensionWidth(1)}
            ref={c => {
              carouselRef = c;
            }}
            // loop
            onBeforeSnapToItem={index => {
              setActiveSlide(index);
              eventTracking(
                SWYPE_COLLECTION_ID,
                `Swipe to ${listData[index]?.nft_title || index}`,
              );
            }}
          />
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} />
        }
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}>
        {renderTitle()}
        {renderCard()}
      </ScrollView>
    );
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <LoadingIndicator fullscreen />
      </View>
    );
  }
  return (
    <View styles={styles.ctnMain}>
      <Header
        type="drawer"
        onPressDrawer={() => {
          navigation.openDrawer();
        }}
        callbackRefresh={handleRefresh}
      />
      {renderContent()}
    </View>
  );
}

export default connect(states, dispacher)(DiscoverNFT);

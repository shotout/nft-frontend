import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import NFTCard from '../../components/nft-card';
import {reset} from '../../helpers/navigationRef';
import {getProduct} from '../../helpers/requests';
import styles from './styles';
import {getDimensionWidth} from '../../helpers/getDimensions';
import {getFutureDate} from '../../helpers/dateHelper';

export default function DiscoverNFT({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [listData, setData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  let carouselRef = useRef();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProduct({per_page: 8, page: 1});
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      reset('BoardingPage');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <Text style={styles.txtTitle}>Here is our pick</Text>
        <Text style={styles.txtDayTitle}>{`for ${getDateItem()}`}</Text>
      </View>
    );
  }

  function renderCard() {
    // return <NFTCard item={listData[0]} />;
    return (
      <Carousel
        layout="tinder"
        layoutCardOffset="9"
        data={listData}
        renderItem={({item, index}) => (
          <NFTCard isActive={index === activeSlide} item={item} />
        )}
        keyExtractor={item => item.uuid}
        sliderWidth={getDimensionWidth(1)}
        itemWidth={getDimensionWidth(1)}
        ref={c => {
          carouselRef = c;
        }}
        onBeforeSnapToItem={index => setActiveSlide(index)}
      />
    );
  }

  function renderContent() {
    return (
      <ScrollView
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
      />
      {renderContent()}
    </View>
  );
}

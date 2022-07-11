import React, {useEffect, useState, useRef} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import {connect} from 'react-redux';
import axios from 'axios';
import {checkNotifications} from 'react-native-permissions';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import NFTCard from '../../components/nft-card';
import {reset} from '../../helpers/navigationRef';
import {getProduct, getVersionApps, updateUser} from '../../helpers/requests';
import styles from './styles';
import {getDimensionWidth} from '../../helpers/getDimensions';
import {getFutureDate} from '../../helpers/dateHelper';
import states from './states';
import {stringToNumber} from '../../helpers/parseNumber';
import dispacher from './dispatcher';
import {
  askTrackingPermission,
  eventTracking,
  SWYPE_COLLECTION_ID,
} from '../../shared/eventTracking';
import {askRating} from '../../shared/askRating';
import ModalDelete from '../../components/modal-delete';
import {isIphone} from '../../shared/devices';
import {ANDROID_APP_VERSION, IOS_APP_VERSION} from '../../shared/constant';
import {dummyProduct} from '../../shared/dummyProduct';

const dummyContent = [
  {
    ...dummyProduct[0],
    isTutorial: true,
    uuid: 'sdasd123',
  },
  {
    ...dummyProduct[0],
  },
];

function DiscoverNFT({
  navigation,
  userProfile,
  listHype,
  setHypeList,
  setOffFirstTimeRender,
  isFirstTimeRender,
  route,
  openAppsCounter,
  increaseOpenAppsCounter,
  showModalDelete,
  setModalDeleteStatus,
  isStaging,
  setAppStatus,
  showLoadingModal,
  setCounterNumber,
}) {
  const [isLoading, setLoading] = useState(isFirstTimeRender !== true);
  const [isRefresh, setRefresh] = useState(false);
  const [listData, setData] = useState(isFirstTimeRender ? dummyContent : []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [loadingMore, setLoadMore] = useState();
  const carouselRef = useRef();
  const [countryCode, setCountryCode] = useState('');
  const [loadingContent, setLoadingContent] = useState(false);
  const askPermission = route.params?.askTrackingPermission;
  const currentAppVersion = isIphone ? IOS_APP_VERSION : ANDROID_APP_VERSION;

  const params = {nft_level: isStaging ? 0 : 1};

  const selectAmountHype = id => {
    const getItem = listHype.find(item => item.idProject === id);
    // console.log('Cehck value getItem', getItem);
    return getItem;
  };

  const handleHypeList = res => {
    if (res.length > 0) {
      if (listHype.length > 0) {
        const hypeData = res.map(item => {
          const fixAmount =
            stringToNumber(item.nft_type) > 0
              ? stringToNumber(item.nft_type)
              : 0;
          const storedHype = selectAmountHype(item.uuid);
          if (
            !storedHype?.currentAmount ||
            stringToNumber(item.nft_type) !== storedHype?.fixAmount
          ) {
            const getAmount = fixAmount > 0 ? Math.round(fixAmount / 3) : 0;
            return {
              idProject: item.uuid,
              currentAmount: getAmount,
              dateAdded: Date.now(),
              fixAmount,
            };
          }
          return selectAmountHype(item.uuid);
        });
        setHypeList(hypeData);
      } else {
        const hypeData = [];
        res.forEach(item => {
          const fixAmount =
            stringToNumber(item.nft_type) > 0
              ? stringToNumber(item.nft_type)
              : 0;
          const getAmount = fixAmount > 0 ? Math.round(fixAmount / 3) : 0;
          hypeData.push({
            idProject: item.uuid,
            currentAmount: getAmount,
            dateAdded: Date.now(),
            fixAmount,
          });
        });
        setHypeList(hypeData);
      }
    }
  };

  const fetchData = async isTutorial => {
    try {
      setLoading(true);
      const version = await getVersionApps({
        app_version: currentAppVersion,
      });
      const res = await getProduct({
        length: 12,
        page: currentPage,
        nft_level: version.data.status,
      });
      const country = await axios.get('https://ipapi.co/json/');
      setLoadingContent(false);
      setCountryCode(country.data.country_code);
      setTotalItem(res.data.total);
      setData(res?.data?.data);
      handleHypeList(res.data.data);
      setLoading(false);
      setCounterNumber(98);
      setAppStatus(version.data.status === 0);
    } catch (err) {
      setCounterNumber(98);
      console.log('Err homepage:', err);
      reset('BoardingPage');
    }
  };

  const handleRefresh = async (disableSnap = false) => {
    try {
      if (!disableSnap) {
        setRefresh(true);
        carouselRef.current.snapToItem(0);
      }
      setPage(1);
      const res = await getProduct({length: 12, page: 1, ...params});
      const additionalItem = isFirstTimeRender
        ? [
            {
              ...res.data.data[0],
              isTutorial: true,
              uuid: 'sdasd123',
            },
          ]
        : [];
      const listItem = [...additionalItem, ...res.data.data];
      setTotalItem(res.data.total);
      handleHypeList(res.data.data);
      setData(listItem);
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
      const res = await getProduct({length: 12, page: currentPage, ...params});
      setTotalItem(res.data.total);
      handleHypeList([...listData, ...res.data.data]);
      setData([...listData, ...res.data.data]);
      setLoadMore(false);
    } catch (err) {
      console.log('Error refresh:', err);
      setLoadMore(false);
    }
  };

  const handleInitialData = () => {
    if (askPermission) {
      console.log('ASK TRACKING PERMISSION');
      askTrackingPermission();
    }
    if (isFirstTimeRender) {
      setCounterNumber(90);
      setLoading(false);
    } else {
      fetchData();
    }
  };

  const handleOpenApps = () => {
    const currentTotalOpenApps = openAppsCounter + 1;
    // const currentDate = moment().format('YYYY-MM-DD');
    // if (currentTotalOpenApps % 6 === 0 && currentDate !== haveBeenAskRating) {
    //   setTimeout(() => {
    //     askRating();
    //     changeAskRatingParameter();
    //   }, 3000);
    // }
    if (currentTotalOpenApps % 3 === 0) {
      checkNotifications().then(({status, settings}) => {
        if (status !== 'granted') {
          setTimeout(() => {
            reset('ActivateNotification');
          }, 1000);
        } else {
          handleInitialData();
        }
      });
    } else {
      handleInitialData();
    }
    increaseOpenAppsCounter(currentTotalOpenApps);
  };

  const resetNotificationBadge = () => {
    updateUser({
      notif_count: 0,
    });
  };

  useEffect(() => {
    handleOpenApps();
    resetNotificationBadge();
  }, []);

  useEffect(() => {
    if (listData.length && !isRefresh && !isStaging) {
      handleLoadMore();
    }
  }, [currentPage]);

  useEffect(() => {
    // console.log(
    //   'Listen activeSlide:',
    //   activeSlide,
    //   activeSlide >= listData.length - 1,
    // );
    if (activeSlide >= listData.length - 1) {
      if (listData.length < totalItem) {
        if (!loadingMore) {
          setPage(2);
        }
      }
    }
  }, [activeSlide]);

  function handleDateFormat() {
    switch (countryCode) {
      case 'CN':
        return 'YYYY-MM-DD';
      case 'US':
        return 'MM/DD/YYYY';
      case 'JP':
        return 'YYYY/MM/DD';
      // case 'FR':
      //   return 'DD/MM/YYYY';
      default:
        return 'DD.MM.YYYY';
    }
  }

  function getDateItem() {
    if (listData?.length > 0 && listData[activeSlide]) {
      const dateFormat = handleDateFormat();
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
      return moment(listData[activeSlide].nft_publish_date).format(dateFormat);
    }
    return '';
  }

  function renderTitle() {
    if (listData[activeSlide].isTutorial) {
      return (
        <View style={styles.ctnTitle}>
          <Text style={styles.txtName}>{`Hi ${
            userProfile?.data?.name || ''
          },`}</Text>
          <Text style={styles.txtTitle}>Here is your quick</Text>
          <Text style={styles.txtDayTitle}>tutorial.</Text>
        </View>
      );
    }
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
                index={index}
                shutOffTutorial={() => {
                  showLoadingModal();
                  setActiveSlide(0);
                  setOffFirstTimeRender();
                  setLoadingContent(true);
                  fetchData(true);
                }}
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
              carouselRef.current = c;
            }}
            // loop
            onBeforeSnapToItem={index => {
              setActiveSlide(index);
              if (listData[activeSlide].isTutorial) {
                showLoadingModal();
                setOffFirstTimeRender();
                setLoadingContent(true);
                fetchData(true);
                setActiveSlide(0);
              }
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
    if (loadingContent) {
      return (
        <View style={styles.ctnLoader}>
          <LoadingIndicator fullscreen />
        </View>
      );
    }
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
    <View style={styles.ctnMain}>
      <Header
        type="drawer"
        onPressDrawer={() => {
          navigation.openDrawer();
        }}
        callbackRefresh={handleRefresh}
      />
      {renderContent()}

      <ModalDelete
        visible={showModalDelete}
        title={`Success.\nPlease check your inbox to confirm your account deletion.`}
        handleClose={() => {
          setModalDeleteStatus(false);
        }}
      />
    </View>
  );
}

export default connect(states, dispacher)(DiscoverNFT);

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Share,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import styles from './styles';
// import {detail} from './detail';
import {URL_WEBSITE} from '../../helpers/static';
import Button from '../../components/button';
import {hexToRgbA} from '../../helpers/hexToRgba';
import {
  addWatchlist,
  getDetailProduct,
  removeWatchlist,
} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';
import Header from '../../components/header';
import {useCountdown} from '../../hooks/useCountdown';
import {getDimensionWidth} from '../../helpers/getDimensions';
import Flame from '../../assets/icon/svg/Flame';
import {colors} from '../../shared/styling';
import {useHypeFlame} from '../../hooks/useHypeFlame';
import dispatcher from './dispatcher';
import states from './states';
import HTMRenderer from '../../components/html-renderer';
import BarProduct from '../../components/bar-product';

const iconVerified = require('../../assets/icon/verified_black.png');

const instagram = require('../../assets/icon/instagram.png');
const fb = require('../../assets/icon/fb.png');
const twitter = require('../../assets/icon/twitter.png');
const discord = require('../../assets/icon/discord.png');
const telegram = require('../../assets/icon/telegram.png');
const linkIcon = require('../../assets/icon/social.png');

function DetailProduct({route, listHype, setHypeList}) {
  const [isLoading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detail, setDetail] = useState({});
  const [isFavorite, setIsFavorite] = useState(
    route.params?.isFavorite || false,
  );
  const [loadingFavorite, setFavorite] = useState(false);

  const handleRefresh = route.params?.handleRefresh;
  let carouselRef = useRef();
  const hypeAmount = useRef();

  const [days, hours, minutes, seconds] = useCountdown(route.params.exp_promo);

  const fetchData = async () => {
    setLoading(true);
    const res = await getDetailProduct(route.params.id);
    setDetail(res.data);
    setLoading(false);
  };

  const handleFavorite = async () => {
    try {
      setFavorite(true);
      if (isFavorite) {
        await removeWatchlist(detail.uuid);
      } else {
        await addWatchlist(detail.uuid);
      }
      setIsFavorite(!isFavorite);
      setFavorite(false);
      if (handleRefresh && typeof handleRefresh === 'function') {
        handleRefresh();
      }
    } catch (err) {
      setFavorite(false);
    }
  };

  const handleSetFlameState = () => {
    const restructureData = listHype.map(item => {
      if (item.idProject === route.params.id) {
        return {
          ...item,
          currentAmount: hypeAmount.current,
        };
      }
      return item;
    });
    setHypeList(restructureData);
  };

  useEffect(() => {
    fetchData();
    return () => {
      handleSetFlameState();
    };
  }, []);

  const colorGradient = [
    detail?.preferance?.gradient1_color || '#fff',
    detail?.preferance?.gradient2_color || '#fff',
  ];

  const handleShare = async () => {
    await Share.share({
      message: `Hey, have you heard about NFT Daily? Discover today's NFT pick before it's too late! https://nftdaily.app/article/${detail.uuid}`,
    });
  };

  const handleOpenURL = url => {
    Linking.openURL(url);
  };

  function renderSlider() {
    return (
      <View style={[styles.ctnSlider]}>
        <Carousel
          layout="default"
          ref={c => {
            carouselRef = c;
          }}
          data={detail.collections}
          renderItem={({item}) => (
            <View style={styles.ctnCollection}>
              <Image
                source={{uri: `${URL_WEBSITE}${item.image}`}}
                style={styles.imgCollection}
              />
            </View>
          )}
          onBeforeSnapToItem={index => setActiveSlide(index)}
          keyExtractor={item => item.uuid}
          sliderWidth={getDimensionWidth(1)}
          itemWidth={getDimensionWidth(1)}
        />
        <View style={styles.dotWrapper}>
          <Pagination
            activeDotIndex={activeSlide}
            dotsLength={detail.collections?.length || 0}
            containerStyle={styles.ctnDot}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            dotContainerStyle={styles.dotContainerStyle}
            inactiveDotOpacity={1}
            inactiveDotScale={0.7}
            carouselRef={carouselRef}
          />
        </View>
      </View>
    );
  }

  function renderTitle() {
    return (
      <View style={styles.ctnTitle}>
        <Text style={styles.txtTitle}>{detail.nft_title}</Text>
        <Image source={iconVerified} style={styles.verifiedIconStyle} />
      </View>
    );
  }

  function renderBar() {
    return <BarProduct detail={detail} hypeAmount={hypeAmount} />;
  }

  function renderDescription() {
    return (
      <View style={styles.ctnDescription}>
        <HTMRenderer content={detail.nft_description} />
      </View>
    );
  }

  function renderRaffle() {
    return (
      <View style={styles.ctnRaffle}>
        <Text style={styles.txtRaffle}>Raffle</Text>
        <Text style={styles.txtDescription}>{detail.nft_raffle}</Text>
      </View>
    );
  }

  function renderTime() {
    if (days + hours + minutes + seconds <= 0) {
      return (
        <LinearGradient
          colors={colorGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.ctnTime}>
          <Text style={styles.txtExpired}>Expired</Text>
        </LinearGradient>
      );
    }
    return (
      <LinearGradient
        colors={colorGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.ctnTime}>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{days}</Text>
          <Text style={styles.timeDesc}>Day</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{hours}</Text>
          <Text style={styles.timeDesc}>Hrs</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{minutes}</Text>
          <Text style={styles.timeDesc}>Min</Text>
        </View>
        <View style={styles.timeWrapper}>
          <Text style={styles.timeTitle}>{seconds}</Text>
          <Text style={styles.timeDesc}>Sec</Text>
        </View>
      </LinearGradient>
    );
  }

  function renderCommunity() {
    return (
      <View style={styles.ctnRaffle}>
        <Text style={styles.txtRaffle}>Community</Text>
        <HTMRenderer content={detail.nft_community} />
        <View style={styles.ctnLink}>
          {detail.community.twitter && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.twitter);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={twitter} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Twitter</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.community.discord && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.discord);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={discord} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Discord</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.community.telegram && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.telegram);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={telegram} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Telegram</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.community?.instagram && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.instagram);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={instagram} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Instagram</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.community?.facebook && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.facebook);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={fb} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Facebook</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    );
  }

  function renderContent() {
    return (
      <View style={styles.ctnContent}>
        {renderTitle()}
        {renderBar()}
        {renderTime()}
        {renderDescription()}
        {/* {renderRaffle()} */}
        {renderCommunity()}
      </View>
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
    <View style={[styles.ctnRoot]}>
      <ScrollView
        style={[
          styles.ctnRoot,
          {backgroundColor: detail.preferance.background_color},
        ]}
        contentContainerStyle={styles.ctnScroll}>
        <Header
          loadingFavorite={loadingFavorite}
          isFavorite={isFavorite}
          handleFavorite={handleFavorite}
          onShare={handleShare}
          type="detail-product"
        />
        {renderSlider()}
        {renderContent()}
      </ScrollView>
      <LinearGradient
        colors={[hexToRgbA('#fff', 0.5), hexToRgbA('#fff', 1)]}
        style={styles.ctnGradient}>
        <Button
          btnStyle={{
            marginTop: 0,
            marginBottom: 0,
            backgroundColor: detail.preferance.main_color,
          }}
          onPress={() => {
            handleOpenURL(detail.nft_mint);
          }}
          label="Mint"
        />
      </LinearGradient>
    </View>
  );
}

export default connect(states, dispatcher)(DetailProduct);

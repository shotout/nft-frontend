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
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import styles from './styles';
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
import dispatcher from './dispatcher';
import states from './states';
import HTMRenderer from '../../components/html-renderer';
import BarProduct from '../../components/bar-product';
import {
  eventTracking,
  HYPE_COLLECTION_ID,
  OPEN_COLLECTION_DURATION_ID,
  OPEN_COLLECTION_ID,
  OPEN_MINT,
  UNHYPE_COLLECTION_ID,
} from '../../shared/eventTracking';
import {dateToUnix, getFutureDate} from '../../helpers/dateHelper';
import DivRender from '../../components/div-render';
import ModalNotification from '../../components/modal-notification';
import CollectionImage from '../../components/collection-image';

const iconVerified = require('../../assets/icon/verified_black.png');

const instagram = require('../../assets/icon/instagram.png');
const openseaIcon = require('../../assets/icon/opensea.png');
const raribleIcon = require('../../assets/icon/rarible.png');
const twitter = require('../../assets/icon/twitter.png');
const discord = require('../../assets/icon/discord.png');
const telegram = require('../../assets/icon/telegram.png');
const linkIcon = require('../../assets/icon/social.png');
const websiteIcon = require('../../assets/icon/website.png');

function DetailProduct({
  route,
  listHype,
  setHypeList,
  increaseOpenArticleCounter,
  openArticleCounter,
  changeAskRatingParameter,
  haveBeenAskRating,
  isStaging,
}) {
  const [isLoading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detail, setDetail] = useState({});
  const [isFavorite, setIsFavorite] = useState(
    route.params?.isFavorite || false,
  );
  const [loadingFavorite, setFavorite] = useState(false);
  const [ratingVisible, showRating] = useState(false);

  const handleRefresh = route.params?.handleRefresh;
  let carouselRef = useRef();
  const hypeAmount = useRef();
  const mountTime = dateToUnix(new Date());
  const [days, hours, minutes, seconds] = useCountdown(route.params.exp_promo);

  const fetchData = async () => {
    setLoading(true);
    const res = await getDetailProduct(route.params.id);
    setDetail(res.data);
    eventTracking(
      OPEN_COLLECTION_ID,
      `Open collection ${res.data?.nft_title || ''}`,
    );
    setLoading(false);
  };

  const handleFavorite = async () => {
    try {
      setFavorite(true);
      if (isFavorite) {
        await removeWatchlist(detail.uuid);
        eventTracking(UNHYPE_COLLECTION_ID, `Unhype ${detail.nft_title || ''}`);
      } else {
        await addWatchlist(detail.uuid);
        eventTracking(HYPE_COLLECTION_ID, `Hype ${detail.nft_title || ''}`);
      }
      setIsFavorite(!isFavorite);
      setFavorite(false);
      if (handleRefresh && typeof handleRefresh === 'function') {
        handleRefresh(true);
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

  const handleOpenRating = () => {
    const currentTotalOpenArticle = openArticleCounter + 1;
    if (currentTotalOpenArticle % 3 === 0 && haveBeenAskRating === null) {
      showRating(true);
      changeAskRatingParameter();
    }
    increaseOpenArticleCounter();
  };

  useEffect(() => {
    fetchData();
    handleOpenRating();
    return () => {
      handleSetFlameState();
      eventTracking(
        OPEN_COLLECTION_DURATION_ID,
        `Open collection duration ${
          dateToUnix(new Date()) - mountTime
        } seconds`,
      );
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
            <CollectionImage imageUrl={`${URL_WEBSITE}${item.image}`} />
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
        <HTMRenderer
          renderers={{
            div: DivRender,
          }}
          content={detail.nft_description}
        />
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
    if (!route.params.exp_promo) {
      return null;
    }
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
          <Text style={styles.timeDesc}>{days === 1 ? 'Day' : 'Days'}</Text>
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
          {detail.community?.opensea && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.opensea);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={openseaIcon} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Open Sea</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.community?.rarible && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.community.rarible);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={raribleIcon} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Rarible</Text>
                <Image source={linkIcon} style={styles.socialIcon} />
              </View>
            </TouchableWithoutFeedback>
          )}
          {detail.nft_website && (
            <TouchableWithoutFeedback
              onPress={() => {
                handleOpenURL(detail.nft_website);
              }}>
              <View style={styles.ctnCommunity}>
                <Image source={websiteIcon} style={styles.icnCommunity} />
                <Text style={styles.txtCommunity}>Website</Text>
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
      {!isStaging && (
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
              eventTracking(OPEN_MINT, `Mint ${detail?.nft_title || ''}`);
            }}
            label={detail.preferance.button_label}
          />
        </LinearGradient>
      )}
      <ModalNotification
        visible={ratingVisible}
        handleClose={() => {
          showRating(false);
        }}
      />
    </View>
  );
}

export default connect(states, dispatcher)(DetailProduct);

import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
// import {detail} from './detail';
import {URL_WEBSITE} from '../../helpers/static';
import Button from '../../components/button';
import {hexToRgbA} from '../../helpers/hexToRgba';
import {getDetailProduct} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';
import Header from '../../components/header';
import {useCountdown} from '../../hooks/useCountdown';

const iconVerified = require('../../assets/icon/verified_black.png');
const starIcon = require('../../assets/icon/rating.png');
const groupIcon = require('../../assets/icon/user_group.png');

const twitter = require('../../assets/icon/twitter.png');
const discord = require('../../assets/icon/discord.png');
const telegram = require('../../assets/icon/telegram.png');
const linkIcon = require('../../assets/icon/social.png');

function DetailProduct({route}) {
  const [isLoading, setLoading] = useState(true);
  const [detail, setDetail] = useState({});

  const [days, hours, minutes, seconds] = useCountdown(route.params.exp_promo);

  const fetchData = async () => {
    setLoading(true);
    const res = await getDetailProduct(route.params.id);
    // console.log('Check res:', res.data);
    setDetail(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colorGradient = [
    detail?.preferance?.gradient1_color || '#fff',
    detail?.preferance?.gradient2_color || '#fff',
  ];

  function renderSlider() {
    return (
      <View style={[styles.ctnSlider]}>
        <View style={styles.ctnCollection}>
          <Image
            source={{uri: `${URL_WEBSITE}${detail.collections[0].image}`}}
            style={styles.imgCollection}
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
    return (
      <View style={styles.descContentWrapper}>
        <View style={styles.ctnSubContent}>
          <View style={styles.ctnIconTab}>
            <Image
              source={starIcon}
              style={[styles.iconContent, styles.starIcon]}
            />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.txtTopContent}>Type</Text>
            <Text style={styles.txtSubContent}>{detail.nft_type}</Text>
          </View>
        </View>
        <View style={styles.ctnSubContent}>
          <View style={styles.ctnIconTab}>
            <Image source={groupIcon} style={styles.iconContent} />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.txtTopContent}>Amount</Text>
            <Text style={styles.txtSubContent}>{detail.nft_amount}</Text>
          </View>
        </View>
        <View style={styles.ctnSubContent}>
          <View style={styles.ctnIconTab}>
            <Image
              source={{uri: `${URL_WEBSITE}${detail.blockchain.vektor}`}}
              style={styles.iconContent}
            />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.txtTopContent}>Price</Text>
            <Text style={styles.txtSubContent}>{`${detail.nft_price}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderDescription() {
    return (
      <View style={styles.ctnDescription}>
        <Text style={styles.txtDescription}>{detail.nft_description}</Text>
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
        <View style={styles.ctnCommunity}>
          <Image source={twitter} style={styles.icnCommunity} />
          <Text style={styles.txtCommunity}>Twitter</Text>
          <Image source={linkIcon} style={styles.socialIcon} />
        </View>
        <View style={styles.ctnCommunity}>
          <Image source={discord} style={styles.icnCommunity} />
          <Text style={styles.txtCommunity}>Discord</Text>
          <Image source={linkIcon} style={styles.socialIcon} />
        </View>
        <View style={styles.ctnCommunity}>
          <Image source={telegram} style={styles.icnCommunity} />
          <Text style={styles.txtCommunity}>Telegram</Text>
          <Image source={linkIcon} style={styles.socialIcon} />
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
        {renderRaffle()}
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
        <Header type="detail-product" />
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
          label="Mint"
        />
      </LinearGradient>
    </View>
  );
}

export default DetailProduct;

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {push} from '../../helpers/navigationRef';
import styles from './styles';
import states from './states';
import {openWeb} from '../../helpers/openWeb';

const iconSocial = require('../../assets/icon/social.png');
const bottomBanner = require('../../assets/icon/image_sidebar.png');

const bannerURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdUb2CSISqHafbkmWMQr_NNAyvv812qVfY_sXyAr5KRTSnpGg/viewform';

function Sidebar({navigation, isStaging}) {
  const topMenu = [
    {
      name: 'Account & Settings',
      onPress: () => {
        navigation.navigate('AccountSettings');
      },
    },
    {
      name: 'FAQ',
      onPress: () => {
        navigation.navigate('FAQ');
      },
    },
    {
      name: 'Safety Guidelines',
      onPress: () => {
        push('SafetyGuideline', {
          id: 'guideline',
          question: 'Safety Guidelines',
        });
      },
    },
    {
      name: 'Need Help?',
      onPress: () => {
        Linking.openURL('mailto:contact@nftdaily.app');
      },
    },
  ];

  const handleOpenURL = url => {
    openWeb(url);
  };

  const socialMenu = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/nftdailyapp?s=21&t=I6KUsgc8uoctkQDfBG3W3Q',
    },
    {name: 'Telegram', url: 'https://t.me/nftdailyapp'},
    {
      name: 'Instagram',
      url: 'https://instagram.com/nftdaily.app?igshid=YmMyMTA2M2Y=',
    },
    {
      name: 'Website',
      url: 'https://nftdaily.app/',
    },
  ];

  function renderMenu() {
    return (
      <View style={styles.ctnTopMenu}>
        {topMenu.map(menu => (
          <TouchableOpacity
            onPress={() => {
              menu.onPress();
              navigation.closeDrawer();
            }}
            style={styles.ctnMenu}
            key={menu.name}>
            <Text style={styles.txtMenu}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
  function renderSocialMenu() {
    return (
      <View style={styles.ctnTopMenu}>
        <View style={styles.ctnSocial}>
          <Text style={[styles.txtMenu, styles.txtTitleSocial]}>Social</Text>
          <Image source={iconSocial} style={styles.socialIconStyle} />
        </View>
        {socialMenu.map(menu => (
          <TouchableOpacity
            onPress={() => {
              handleOpenURL(menu.url);
            }}
            style={styles.ctnMenu}
            key={menu.name}>
            <Text style={styles.txtMenu}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function renderBanner() {
    if (isStaging) {
      return null;
    }
    return (
      <View style={styles.ctBanner}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleOpenURL(bannerURL);
          }}>
          <Image source={bottomBanner} style={styles.bannerStyle} />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <ScrollView style={styles.topWrapper}>
        <View style={styles.ctnHorizontal}>
          <TouchableOpacity
            style={styles.ctnClose}
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <AntDesign name="close" color="#000" size={30} />
          </TouchableOpacity>
          {renderMenu()}
          {renderSocialMenu()}
        </View>
        {renderBanner()}
      </ScrollView>
    </View>
  );
}

export default connect(states)(Sidebar);

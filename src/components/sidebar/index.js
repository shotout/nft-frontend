import React from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {push} from '../../helpers/navigationRef';
import styles from './styles';

const iconSocial = require('../../assets/icon/social.png');

export default function Sidebar({navigation, route}) {
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
        // contact@nftdaily.app
      },
    },
  ];

  const handleOpenURL = url => {
    Linking.openURL(url);
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

  return (
    <View style={styles.ctnRoot}>
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
  );
}

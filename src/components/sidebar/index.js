import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';

const iconSocial = require('../../assets/icon/social.png');

export default function Sidebar({navigation}) {
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
        navigation.navigate('SafetyGuideline');
      },
    },
    {name: 'Need Help?', onPress: () => {}},
  ];

  const socialMenu = [
    {name: 'Twitter'},
    {name: 'Discord'},
    {name: 'Telegram'},
    {name: 'Website'},
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
            // onPress={menu.onPress}
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

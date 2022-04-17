import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import styles from './styles';

const forwardIcon = require('../../assets/icon/forward_icon.png');

export default function AccountSettings() {
  const menuItem = [
    {title: 'Your Name', desc: 'Change your display name'},
    {title: 'Email', desc: 'Update your email address linked to this account'},
    {title: 'Notifications', desc: 'Change your notifications settings'},
    {title: 'Wallets', desc: 'Change your wallet selection'},
  ];

  return (
    <View style={styles.ctnRoot}>
      <Header title="Account & Settings" />
      <View style={styles.ctnCard}>
        <FlatList
          data={menuItem}
          renderItem={({item}) => (
            <View style={styles.ctnItem}>
              <View style={styles.ctnLeft}>
                <Text style={styles.txtTitle}>{item.title}</Text>
                <Text style={styles.txtDesc}>{item.desc}</Text>
              </View>
              <Image source={forwardIcon} style={styles.forwardStyle} />
            </View>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
}

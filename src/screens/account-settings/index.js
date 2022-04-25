import React from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../../components/header';
import {navigate} from '../../helpers/navigationRef';
import styles from './styles';

const forwardIcon = require('../../assets/icon/forward_icon.png');

export default function AccountSettings() {
  const menuItem = [
    {
      title: 'Your Name',
      desc: 'Change your display name',
      onPress: () => {
        navigate('Register', {edit: 'username'});
      },
    },
    {
      title: 'Email',
      desc: 'Update your email address linked to this account',
      onPress: () => {
        navigate('Register', {edit: 'email'});
      },
    },
    {
      title: 'Notifications',
      desc: 'Change your notifications settings',
      onPress: () => {},
    },
    {
      title: 'Wallets',
      desc: 'Change your wallet selection',
      onPress: () => {
        navigate('Register', {edit: 'wallet'});
      },
    },
  ];

  return (
    <View style={styles.ctnRoot}>
      <Header title="Account & Settings" />
      <View style={styles.ctnCard}>
        <FlatList
          data={menuItem}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={item.onPress}>
              <View style={styles.ctnItem}>
                <View style={styles.ctnLeft}>
                  <Text style={styles.txtTitle}>{item.title}</Text>
                  <Text style={styles.txtDesc}>{item.desc}</Text>
                </View>
                <Image source={forwardIcon} style={styles.forwardStyle} />
              </View>
            </TouchableWithoutFeedback>
          )}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
}

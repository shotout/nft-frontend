import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {checkNotifications} from 'react-native-permissions';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate} from '../../helpers/navigationRef';
import {getProfile} from '../../helpers/requests';
import {isIphone} from '../../shared/devices';
import styles from './styles';

const forwardIcon = require('../../assets/icon/forward_icon.png');

export default function AccountSettings() {
  const [loadingGetEdit, setEditLoading] = useState(false);
  const [detail, setDetail] = useState({
    name: '',
    email: '',
  });

  const getInitialData = async () => {
    setEditLoading(true);
    const res = await getProfile();
    setDetail(res.data);
    setEditLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  console.log('Check detail :', detail);
  const menuItem = [
    {
      title: detail.name,
      desc: 'Change your display name',
      onPress: () => {
        navigate('Register', {edit: 'username'});
      },
    },
    {
      title: detail.email,
      desc: 'Update your email address linked to this account',
      onPress: () => {
        navigate('Register', {edit: 'email'});
      },
    },
    {
      title: 'Notifications',
      desc: 'Change your notifications settings',
      onPress: () => {
        if (isIphone) {
          checkNotifications().then(({status, settings}) => {
            if (status === 'granted') {
              Linking.openSettings();
            } else {
              navigate('ActivateNotification');
            }
          });
        } else {
          Linking.openSettings();
        }
      },
    },
    {
      title: 'Wallets',
      desc: 'Change your wallet selection',
      onPress: () => {
        navigate('Register', {edit: 'wallet'});
      },
    },
  ];

  function renderContent() {
    if (loadingGetEdit) {
      return <LoadingIndicator fullscreen />;
    }
    return (
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
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <Header title="Account & Settings" />
      {renderContent()}
    </View>
  );
}

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
import {connect} from 'react-redux';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate, reset} from '../../helpers/navigationRef';
import {getProfile} from '../../helpers/requests';
import {isIphone} from '../../shared/devices';
import styles from './styles';
import dispatcher from './dispatcher';
import states from './states';
import Button from '../../components/button';

const forwardIcon = require('../../assets/icon/forward_icon.png');

function AccountSettings({setProfileUser, userProfile}) {
  const [loadingGetEdit, setEditLoading] = useState(false);

  const getInitialData = async () => {
    setEditLoading(true);
    const res = await getProfile();
    setProfileUser({
      ...userProfile,
      ...res,
    });
    setEditLoading(false);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const menuItem = [
    {
      title: userProfile.data.name,
      desc: 'Change your display name',
      onPress: () => {
        navigate('Register', {edit: 'username'});
      },
    },
    {
      title: userProfile.data.email.includes('guest')
        ? 'Email'
        : userProfile.data.email,
      desc: 'Update your email address linked to this account',
      onPress: () => {
        navigate('Register', {
          edit: 'email',
          isGuest: userProfile.data.email.includes('guest'),
        });
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
    {
      title: 'Delete Account',
      desc: 'Delete your account',
      onPress: () => {
        navigate('DeleteConfirmation');
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
      <View style={styles.ctnScrollStyle}>{renderContent()}</View>

      {/* <Button
        btnStyle={styles.btnStyle}
        label="Logout"
        onPress={() => {
          setProfileUser({});
          reset('BoardingPage');
        }}
      /> */}
    </View>
  );
}

export default connect(states, dispatcher)(AccountSettings);

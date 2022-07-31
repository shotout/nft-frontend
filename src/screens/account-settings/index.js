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
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import {navigate} from '../../helpers/navigationRef';
import {getProfile, getWalletToken} from '../../helpers/requests';
import {isIphone} from '../../shared/devices';
import styles from './styles';
import dispatcher from './dispatcher';
import states from './states';
import Button from '../../components/button';

const forwardIcon = require('../../assets/icon/forward_icon.png');

function AccountSettings({setProfileUser, userProfile}) {
  const [loadingGetEdit, setEditLoading] = useState(false);
  const [loadingWallet, setWalletLoading] = useState(false);
  const [walletToken, setWalletToken] = useState(null);

  const getInitialData = async isWallet => {
    if (isWallet) {
      setWalletLoading(true);
    } else {
      setEditLoading(true);
    }
    const res = await getProfile();
    setProfileUser({
      ...userProfile,
      ...res,
    });
    if (isWallet) {
      setWalletLoading(false);
    } else {
      setEditLoading(false);
    }
  };

  const getToken = async () => {
    const res = await getWalletToken();
    setWalletToken(res.data);
  };

  useEffect(() => {
    getInitialData();
    getToken();
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
              navigate('ActivateNotification', {justBack: true});
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

  const handleConnectWallet = async () => {
    const URLDirect = `https://wallet.nftdaily.app/?token=${walletToken}&direct_url=nftdaily://deeplink/setting`;
    if ((await InAppBrowser.isAvailable()) && walletToken) {
      const result = await InAppBrowser.open(URLDirect, {
        dismissButtonStyle: 'cancel',
        enableUrlBarHiding: true,
        hasBackButton: false,
        enableDefaultShare: false,
        showInRecents: true,
        forceCloseOnRedirection: false,
      });
      getInitialData(true);
    } else {
      console.log('didnt support in app browser');
      if (walletToken) {
        Linking.openURL(URLDirect);
      }
    }
  };

  function renderButtonWallet() {
    if (userProfile.data.wallet_connect) {
      return (
        <Button
          type="green"
          isLoading={loadingWallet}
          label="Wallet Linked"
          btnStyle={styles.btnStyle}
          // onPress={handleConnectWallet}
        />
      );
    }
    return (
      <Button
        type="dark"
        isLoading={loadingWallet}
        label="Set Wallet Address"
        btnStyle={styles.btnStyle}
        onPress={handleConnectWallet}
      />
    );
  }

  function renderContent() {
    if (loadingGetEdit) {
      return <LoadingIndicator fullscreen />;
    }
    return (
      <View style={styles.contentWrapper}>
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
          {renderButtonWallet()}
        </View>

        <View style={styles.ctnText}>
          <Text style={styles.txtHelp}>
            Feel free to reach out to us if you encounter any problem regarding
            your account.
          </Text>
        </View>
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

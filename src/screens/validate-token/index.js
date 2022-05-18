import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {checkNotifications} from 'react-native-permissions';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../layout/auth/title';
import styles from './styles';
import {reset} from '../../helpers/navigationRef';
import RegisterAnimate from '../../components/register-animate';
import {verifyToken} from '../../helpers/requests';
import dispatcher from './dispatcher';
import LoadingIndicator from '../../components/loading-indicator';

function ValidateToken({route, setProfileUser}) {
  const [isLoading, selectedLoading] = useState(true);
  const [isError, setError] = useState(false);
  const handleData = async status => {
    try {
      selectedLoading(true);
      const res = await verifyToken(route.params.id);
      if (res.status === 'failed') {
        setError(true);
      } else {
        setProfileUser(res);
      }
      if (status === 'granted') {
        reset('Homepage');
      } else {
        reset('ActivateNotification');
      }
      selectedLoading(false);
    } catch (err) {
      console.log('Error verify:', err);
      selectedLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    checkNotifications().then(({status, settings}) => {
      console.log('Check notif:', status);
      handleData(status);
    });
  }, []);

  function renderContent() {
    if (isError) {
      return (
        <>
          <Title label="Token Expired!" />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              To continue please re-login using your email.
            </Text>
          </View>
        </>
      );
    }
    return (
      <>
        <Title label="All done!" />
        <View style={styles.ctnDesc}>
          <Text style={styles.txtDesc}>
            {`Discover one new exclusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
          </Text>
        </View>
      </>
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
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft />
        <ScrollView style={styles.ctnRoot}>
          <View style={styles.ctnBanner}>
            <RegisterAnimate />
          </View>
          {renderContent()}
        </ScrollView>
      </View>
      <Button
        btnStyle={styles.btnStyle}
        isLoading={isLoading}
        label={isError ? 'Go Back' : 'Start Exploring'}
        onPress={() => {
          if (isError) {
            reset('BoardingPage');
          } else {
            reset('Homepage');
          }
        }}
      />
    </View>
  );
}

export default connect(null, dispatcher)(ValidateToken);

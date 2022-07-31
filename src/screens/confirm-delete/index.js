import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../layout/auth/title';
import styles from './styles';
import dispatcher from './dispatcher';
import {deleteUser} from '../../helpers/requests';

function ConfirmDelete({
  setDeleteUserStatus,
  navigation,
  setModalDeleteStatus,
}) {
  const [isLoading, setLoading] = useState(false);

  const handleInitial = async () => {
    try {
      setLoading(true);
      await deleteUser();
      setDeleteUserStatus(true);
      setLoading(false);
      navigation.popToTop();
      setModalDeleteStatus(true);
    } catch (err) {
      console.log('Err initial', err);
      // reset('BoardingPage');
    }
  };

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollStyle}
          style={styles.ctnRoot}>
          <Title label="Sad to see you go! " />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              After clicking the “Delete Account” button at the bottom of this
              page, please confirm your account deletion by clicking the link
              that was sent to your email inbox.
            </Text>
            <Text style={styles.txtDesc}>
              Make sure to also check your spam folder, if you cannot find it.
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
      <Button
        btnStyle={styles.btnStyle}
        isLoading={isLoading}
        label="DELETE ACCOUNT"
        onPress={() => {
          handleInitial();
        }}
      />
    </View>
  );
}

export default connect(null, dispatcher)(ConfirmDelete);

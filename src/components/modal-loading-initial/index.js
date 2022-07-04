import React, {useEffect, useState} from 'react';
import {Modal, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';

const loadingImage = require('../../assets/icon/load_image_loading.json');

function ModalLoadingInitial({
  hideLoadingModal,
  setCounterNumber,
  loadingModal,
}) {
  const initalState = 0;
  const [count, setCount] = useState(initalState);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterNumber(loadingModal.counter + Math.floor(Math.random() * 10));
    }, 1000);
    if (loadingModal.counter >= 100) {
      clearInterval(interval);
      hideLoadingModal();
    }
    return () => clearInterval(interval);
  }, [loadingModal.counter]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={loadingModal.visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.lottieWrapper}>
          <Text style={styles.txtPercentage}>
            {loadingModal.counter >= 100 ? 100 : loadingModal.counter}
            <Text style={styles.percent}>%</Text>
          </Text>
          <LottieView
            source={loadingImage}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
        <Text style={styles.txtLoader}>Loading amazingness...</Text>
      </View>
    </Modal>
  );
}

export default connect(states, dispatcher)(ModalLoadingInitial);

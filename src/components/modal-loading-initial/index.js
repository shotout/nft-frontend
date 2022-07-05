import React, {useEffect, useState} from 'react';
import {Modal, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import styles from './styles';
import states from './states';
import dispatcher from './dispatcher';

const loadingImage = require('../../assets/icon/load_image_loading.json');

function ModalLoadingInitial({
  setCounterNumber,
  loadingModal,
  hideLoadingModal,
}) {
  const [activeText, setActiveText] = useState(0);
  const textToRender = [
    'Loading amazingness...',
    'NO FOMO...\nScanning the chain for the hottest NFT...',
    'Fire projects inbound...',
    'Unique NFTs take time...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterNumber(loadingModal.counter + Math.floor(Math.random() * 20));
    }, 1000);
    if (loadingModal.counter >= 100) {
      clearInterval(interval);
      hideLoadingModal();
    }

    const textInterval = setInterval(() => {
      setActiveText(currentValue =>
        currentValue === 3 ? 0 : currentValue + 1,
      );
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [loadingModal.counter]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={loadingModal.visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.lottieWrapper}>
          <View style={styles.counterWrapper}>
            <Text style={[styles.txtPercentage]}>
              {loadingModal.counter >= 99 ? 99 : loadingModal.counter}
              {/* 22 */}
            </Text>
            <Text style={styles.percent}>%</Text>
          </View>
          <LottieView
            source={loadingImage}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
        <View style={styles.ctnTextLoader}>
          <Text style={styles.txtLoader}>{textToRender[activeText]}</Text>
        </View>
        {/* <Text style={styles.txtLoader}>
          {'NO FOMO...\nScanning the chain for hottest NFT...'}
        </Text> */}
      </View>
    </Modal>
  );
}

export default connect(states, dispatcher)(ModalLoadingInitial);

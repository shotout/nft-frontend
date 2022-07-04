import React, {useEffect, useState} from 'react';
import {Modal, View, Text, Image} from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';
import {handleShuffleText} from '../../helpers/shuffleText';

const loadingImage = require('../../assets/icon/load_image_loading.json');

function ModalLoadingInitial() {
  const initalState = 0;
  const [count, setCount] = useState(initalState);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 20);
    }, 1000);
    if (count >= 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Modal
      animationType="slide"
      transparent
      // visible={visible}
      visible
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.lottieWrapper}>
          <Text style={styles.txtPercentage}>
            {count}
            <Text style={styles.percent}>%</Text>
          </Text>
          <LottieView
            source={loadingImage}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
        <Text style={styles.txtLoader}>
          {handleShuffleText('Loading amazingness...')}
        </Text>
      </View>
    </Modal>
  );
}

export default ModalLoadingInitial;

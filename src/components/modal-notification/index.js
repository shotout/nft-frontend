import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {moderateScale} from 'react-native-size-matters';
import {askRating} from '../../shared/askRating';
import styles from './styles';
import dispatcher from './dispatcher';
import {colors} from '../../shared/styling';

const ratingIcon = require('../../assets/icon/rating_star.png');
const unSelectRatingStar = require('../../assets/icon/unselect_rating_star.png');

function ModalNotification({changeAskRatingParameter, handleClose, visible}) {
  const [ratingSelected, setRatingSelected] = useState(5);

  const handleSubmit = () => {
    if (ratingSelected === 5 || ratingSelected === 4) {
      askRating();
      changeAskRatingParameter();
    }
    handleClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.itemWrapper}>
          <Text style={styles.txtTitle}>Enjoying NFT Daily?</Text>
          <Text style={styles.txtDesc}>Please give us rating.</Text>
          <View style={styles.ctnIcon}>
            {Array.apply(null, Array(ratingSelected)).map((x, i) => (
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(i + 1);
                }}>
                <Image
                  source={ratingIcon}
                  style={styles.ratingImageStyle}
                  key={i.toString()}
                />
              </TouchableOpacity>
            ))}
            {Array.apply(null, Array(5 - ratingSelected)).map((x, i) => (
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(ratingSelected + i + 1);
                }}>
                <Image
                  source={unSelectRatingStar}
                  style={styles.ratingImageStyle}
                  key={i.toString()}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.ctnBtnSubmit}>
            <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit}>
              <Text style={styles.txtSubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ctnClose}>
            <TouchableOpacity
              onPress={() => {
                handleClose();
              }}>
              <Fontisto
                name="close-a"
                color={colors.dark}
                size={moderateScale(16)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default connect(undefined, dispatcher)(ModalNotification);

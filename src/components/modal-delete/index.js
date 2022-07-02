import React, {useState} from 'react';
import {Modal, View, Text, TouchableOpacity, Image} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {moderateScale} from 'react-native-size-matters';
import styles from './styles';
import {colors} from '../../shared/styling';
import Button from '../button';

const appsIcon = require('../../assets/icon/notification.png');

function ModalDelete({handleClose, visible, title}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.itemWrapper}>
          <Image source={appsIcon} style={styles.headerImageStyle} />
          <Text style={styles.txtTitle}>
            {title || `Success.\nYour account has\nbeen deleted.`}
          </Text>
          <Button
            btnStyle={styles.btnStyle}
            label="Close"
            onPress={handleClose}
          />
        </View>
        {/* <View style={styles.ctnClose}>
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
        </View> */}
      </View>
    </Modal>
  );
}

export default ModalDelete;

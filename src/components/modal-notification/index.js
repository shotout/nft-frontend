import React from 'react';
import {Modal, View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';

export default function ModalNotification() {
  return (
    <Modal animationType="slide" transparent visible onRequestClose={() => {}}>
      <View style={styles.ctnContent}>
        <View style={styles.itemWrapper}>
          <Text style={styles.txtTitle}>Enjoying NFT Daily?</Text>
          <Text style={styles.txtDesc}>Please give us rating.</Text>
          <View style={styles.ctnBtnSubmit}>
            <TouchableOpacity style={styles.btnStyle}>
              <Text style={styles.txtSubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

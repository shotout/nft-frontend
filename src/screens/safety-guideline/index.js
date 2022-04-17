import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import styles from './styles';
import {faqData} from './data';
import FAQItem from '../../components/faq-item';

export default function SafetyGuideline() {
  return (
    <View style={styles.ctnRoot}>
      <Header title="Safety Guidelines" />
      <FlatList
        data={faqData}
        renderItem={({item}) => <FAQItem item={item} />}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
}

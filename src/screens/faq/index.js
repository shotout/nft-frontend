import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import styles from './styles';
import {faqData} from './data';
import FAQItem from '../../components/faq-item';

export default function FAQ() {
  return (
    <View style={styles.ctnRoot}>
      <Header title="FAQ" />
      <FlatList
        data={faqData}
        renderItem={({item}) => <FAQItem item={item} />}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
}

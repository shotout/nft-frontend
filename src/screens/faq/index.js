/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import Header from '../../components/header';
import styles from './styles';
import FAQItem from '../../components/faq-item';
import {getFaq} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';

export default function FAQ() {
  const [isLoading, setLoading] = useState(true);
  const [listData, setlistData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getFaq();
    setLoading(false);
    setlistData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.ctnRoot}>
      <Header title="FAQ" />
      <FlatList
        contentContainerStyle={styles.ctnScroll}
        data={listData}
        renderItem={({item}) => <FAQItem item={item} />}
        keyExtractor={item => item.uuid}
        ListFooterComponent={() => {
          if (isLoading) {
            return <LoadingIndicator />;
          }
          return null;
        }}
      />
    </View>
  );
}

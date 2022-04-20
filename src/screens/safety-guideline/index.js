/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../components/header';
import styles from './styles';
import FAQItem from '../../components/faq-item';
import {getFlagFAQ} from '../../helpers/requests';
import LoadingIndicator from '../../components/loading-indicator';

export default function SafetyGuideline({route}) {
  console.log('Check route:', route);

  const [isLoading, setLoading] = useState(true);
  const [listData, setlistData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getFlagFAQ(route.params.id);
    setLoading(false);
    setlistData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.ctnRoot}>
      <Header title={route.params.question} />
      <FlatList
        data={listData.childs}
        contentContainerStyle={styles.ctnScroll}
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

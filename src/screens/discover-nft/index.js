import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loading-indicator';
import NFTCard from '../../components/nft-card';
import {reset} from '../../helpers/navigationRef';
import {getProduct} from '../../helpers/requests';
import styles from './styles';

export default function DiscoverNFT({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [listData, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProduct({per_page: 8, page: 1});
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      reset('BoardingPage');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  function renderTitle() {
    return (
      <View style={styles.ctnTitle}>
        <Text style={styles.txtTitle}>Here is our pick</Text>
        <Text style={styles.txtDayTitle}>for today.</Text>
      </View>
    );
  }

  function renderContent() {
    return (
      <ScrollView
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}>
        {renderTitle()}
        {listData?.length > 0 && <NFTCard item={listData[0]} />}
      </ScrollView>
    );
  }

  if (isLoading) {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <LoadingIndicator fullscreen />
      </View>
    );
  }
  return (
    <View styles={styles.ctnMain}>
      <Header
        type="drawer"
        onPressDrawer={() => {
          navigation.openDrawer();
        }}
      />
      {renderContent()}
    </View>
  );
}

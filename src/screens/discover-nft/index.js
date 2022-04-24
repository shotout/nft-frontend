import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../components/header';
import NFTCard from '../../components/nft-card';
import {reset} from '../../helpers/navigationRef';
import {getProduct} from '../../helpers/requests';
import styles from './styles';

export default function DiscoverNFT({navigation, route}) {
  const fetchData = async () => {
    try {
      const res = await getProduct({per_page: 8, page: 1});
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

  return (
    <View styles={styles.ctnRoot}>
      <Header
        type="drawer"
        onPressDrawer={() => {
          navigation.openDrawer();
        }}
      />
      <ScrollView
        style={styles.ctnRoot}
        contentContainerStyle={styles.ctnScroll}>
        {renderTitle()}
        <NFTCard />
      </ScrollView>
    </View>
  );
}

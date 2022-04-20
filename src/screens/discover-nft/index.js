import React, {useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Header from '../../components/header';
import NFTCard from '../../components/nft-card';
import {getProduct} from '../../helpers/requests';
import styles from './styles';

export default function DiscoverNFT({navigation}) {
  const fetchData = async () => {
    const res = await getProduct();
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

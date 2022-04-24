import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Button from '../../components/button';
import Header from '../../components/header';
import Title from '../../layout/auth/title';
import styles from './styles';
import {reset} from '../../helpers/navigationRef';
import RegisterAnimate from '../../components/register-animate';

function ValidateToken({route}) {
  const [isLoading, selectedLoading] = useState(false);
  console.log('Check params :', route.params.id);
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft />
        <ScrollView style={styles.ctnRoot}>
          <View style={styles.ctnBanner}>
            <RegisterAnimate />
          </View>
          <Title label="All done!" />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`Discover one new exclusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
            </Text>
          </View>
        </ScrollView>
      </View>
      <Button
        isLoading={isLoading}
        label="Start Exploring"
        onPress={() => {
          reset('Homepage');
        }}
      />
    </View>
  );
}

export default ValidateToken;

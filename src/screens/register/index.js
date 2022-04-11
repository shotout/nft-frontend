import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {colors} from '../../shared/styling';
import {navigate} from '../../helpers/navigationRef';

const iconMetamask = require('../../assets/icon/metamask.webp');
const iconBinance = require('../../assets/icon/bnb.png');
const iconCardano = require('../../assets/icon/cardano.webp');
const iconCryptocom = require('../../assets/icon/cryptocom.png');
const bannerImage = require('../../assets/icon/nft_boarding.gif');

export default function Register() {
  const [activeStep, setActiveStep] = useState('username'); // email,wallet
  const [selectedWallet, setSelectedWallet] = useState([]);
  const walletArr = [
    {name: 'Metamask', icon: iconMetamask},
    {name: 'Binance', icon: iconBinance},
    {name: 'Cardano', icon: iconCardano},
    {name: 'Crypto.com', icon: iconCryptocom},
  ];

  const [values, setValues] = useState({
    username: '',
    email: '',
  });

  const handleChangeText = (stateName, value) => {
    setValues({...values, [stateName]: value});
  };

  const findSelectedWallet = name => {
    const isThere = selectedWallet.find(item => item === name);
    if (isThere) {
      return true;
    }
    return false;
  };

  const handleSelectedWallet = name => {
    const isThere = findSelectedWallet(name);
    if (isThere) {
      setSelectedWallet(selectedWallet.filter(item => item !== name));
    } else {
      const currrentData = [...selectedWallet];
      currrentData.push(name);
      setSelectedWallet(currrentData);
    }
  };

  function getLabel() {
    if (activeStep === 'done') {
      return 'Start Exploring';
    }
    return 'Continue';
  }

  const handleChangeStep = () => {
    switch (activeStep) {
      case 'username':
        setActiveStep('wallet');
        break;
      case 'wallet':
        setActiveStep('email');
        break;
      case 'email':
        setActiveStep('done');
        break;
      case 'done':
        navigate('Watchlist');
        break;
      default:
        break;
    }
  };

  function renderContent() {
    if (activeStep === 'done') {
      return (
        <ScrollView>
          <View style={styles.ctnBanner}>
            <Image source={bannerImage} style={styles.bannerStyle} />
          </View>
          <Title label="All done!." />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`Discover one new exlusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
            </Text>
          </View>
        </ScrollView>
      );
    }
    if (activeStep === 'email') {
      return (
        <>
          <Title label="Almost done, lets get you the hottest picks directly into your inbox." />
          <Input
            maxLength={100}
            value={values.email}
            onChangeText={value => {
              handleChangeText('email', value);
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </>
      );
    }
    if (activeStep === 'wallet') {
      console.log('Check data:', selectedWallet);
      return (
        <>
          <Title label="Make it relevant for you! Select your primary wallets." />
          <View style={styles.cntWallet}>
            {walletArr.map(wallet => {
              const isWalletSelected = findSelectedWallet(wallet.name);
              console.log('Check wallet', wallet.name, isWalletSelected);
              return (
                <View style={styles.ctnWallet} key={wallet.name}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSelectedWallet(wallet.name);
                    }}>
                    <View
                      style={[
                        styles.icnWallet,
                        isWalletSelected && styles.redBorder,
                      ]}>
                      <Image
                        source={wallet.icon}
                        style={styles.walletIcoStyle}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.txtWallet}>{wallet.name}</Text>
                </View>
              );
            })}
            <View style={styles.ctnWallet}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedWallet([]);
                }}>
                <View style={styles.icnWallet}>
                  <AntDesign name="close" size={30} color={colors.dark} />
                </View>
              </TouchableOpacity>
              <Text style={styles.txtWallet}>None</Text>
            </View>
          </View>
        </>
      );
    }
    return (
      <>
        <Title label="Lets get personal, what sould we call you?" />
        <Input
          value={values.username}
          onChangeText={value => {
            handleChangeText('username', value);
          }}
          maxLength={30}
          placeholder="Your name"
        />
      </>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header />
        {renderContent()}
      </View>
      <Button label={getLabel()} onPress={handleChangeStep} />
    </View>
  );
}

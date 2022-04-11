import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {colors} from '../../shared/styling';

const iconMetamask = require('../../assets/icon/metamask.png');
const iconBinance = require('../../assets/icon/bnb.png');
const iconCardano = require('../../assets/icon/cardano.webp');
const iconCryptocom = require('../../assets/icon/cryptocom.png');
const bannerImage = require('../../assets/icon/banner.png');

export default function Register() {
  const [activeStep, setActiveStep] = useState('username'); // email,wallet
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
      default:
        break;
    }
  };

  function renderContent() {
    if (activeStep === 'done') {
      return (
        <>
          <View style={styles.ctnBanner}>
            <Image source={bannerImage} style={styles.bannerStyle} />
          </View>
          <Title label="All done!." />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`Discover one new exlusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
            </Text>
          </View>
        </>
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
      return (
        <>
          <Title label="Make it relevant for you! Select your primary wallets." />
          <View style={styles.cntWallet}>
            {walletArr.map(wallet => (
              <View style={styles.ctnWallet} key={wallet.name}>
                <Image source={wallet.icon} style={styles.icnWallet} />
                <Text style={styles.txtWallet}>{wallet.name}</Text>
              </View>
            ))}
            <View style={styles.ctnWallet}>
              <View style={[styles.icnWallet, styles.bgWallet]}>
                <AntDesign name="close" size={30} color={colors.white} />
              </View>
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
        <Header title="NFT of the Day" />
        {renderContent()}
      </View>
      <Button label={getLabel()} onPress={handleChangeStep} />
    </View>
  );
}

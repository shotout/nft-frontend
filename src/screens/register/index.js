import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {colors} from '../../shared/styling';
import {goBack, navigate, reset} from '../../helpers/navigationRef';
import states from './states';
import {postRegister} from '../../helpers/requests';
import arrayErrorResturctor from './responseValidatorArr';
import RegisterAnimate from '../../components/register-animate';

function Register({walletList}) {
  const [activeStep, setActiveStep] = useState('username'); // email,wallet
  const [selectedWallet, setSelectedWallet] = useState([]);
  const [isLoading, selectedLoading] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    fcm_token:
      'cBStvPyy9JkNQLq2F_j1v3:APA91bF5kb0tlBxD2kPaDNw4zXj6V9sOEyIY78P-1gVb3ZPjUTIDvLY92x6R4hvs2VwxcziQ-M0OPz0gO2YEDL0pSujCdz7jjpka5CtYuIe-PV0OnErcOgHOqWRYNp6W6g09oeXg6ny5',
  });
  const [error, setError] = useState({
    name: null,
    email: null,
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

  const handleBack = () => {
    switch (activeStep) {
      case 'username':
        goBack();
        break;
      case 'wallet':
        setActiveStep('username');
        break;
      case 'email':
        setActiveStep('wallet');
        break;
      case 'done':
        break;
      default:
        break;
    }
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

  const handleSubmit = async () => {
    try {
      selectedLoading(true);
      const body = {
        ...values,
        wallet: selectedWallet,
      };
      await postRegister(body);
      selectedLoading(false);
      setActiveStep('done');
    } catch (err) {
      if (err.data.errors) {
        const errorRes = arrayErrorResturctor(err.data.errors);
        setError(errorRes);
      }
      selectedLoading(false);
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
        if (values.name) {
          setActiveStep('wallet');
          setError({
            ...error,
            name: null,
          });
        } else {
          setError({
            ...error,
            name: 'Username is required.',
          });
        }
        break;
      case 'wallet':
        setActiveStep('email');
        break;
      case 'email':
        if (values.email) {
          handleSubmit();
          setError({
            ...error,
            email: null,
          });
        } else {
          setError({
            ...error,
            email: 'Email is required.',
          });
        }
        break;
      case 'done':
        reset('Homepage');
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
            <RegisterAnimate />
          </View>
          <Title label="All done!" />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`Discover one new exclusively selected NFT project each day.\n\nVetted and guaranteed to be interesting.`}
            </Text>
          </View>
        </ScrollView>
      );
    }
    if (activeStep === 'email') {
      return (
        <>
          <Title
            label={`Almost done,\nlet's get you the hottest picks directly into your inbox.`}
          />
          <Input
            maxLength={100}
            value={values.email}
            onChangeText={value => {
              handleChangeText('email', value);
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error.email}
          />
        </>
      );
    }
    if (activeStep === 'wallet') {
      return (
        <>
          <Title label="Make it relevant for you! Select your primary wallets." />
          <View style={styles.cntWallet}>
            {walletList.map(wallet => {
              const isWalletSelected = findSelectedWallet(wallet.uuid);
              return (
                <View style={styles.ctnWallet} key={wallet.uuid}>
                  <TouchableOpacity
                    onPress={() => {
                      handleSelectedWallet(wallet.uuid);
                    }}>
                    <View
                      style={[
                        styles.icnWallet,
                        isWalletSelected && styles.redBorder,
                      ]}>
                      <Image
                        source={{uri: wallet.image_url}}
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
        <Title label="Lets get personal, what should we call you?" />
        <Input
          value={values.name}
          onChangeText={value => {
            handleChangeText('name', value);
          }}
          maxLength={30}
          placeholder="Your name"
          error={error.name}
        />
      </>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft={activeStep === 'done'} backPress={handleBack} />
        <ScrollView style={styles.ctnRoot}>{renderContent()}</ScrollView>
      </View>
      <Button
        isLoading={isLoading}
        label={getLabel()}
        onPress={handleChangeStep}
      />
    </View>
  );
}

export default connect(states)(Register);

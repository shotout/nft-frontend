import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {moderateScale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import {openInbox} from 'react-native-email-link';
import styles from './styles';
import Button from '../button';
import {mintViaEmail} from '../../helpers/requests';
import states from './states';
import Input from '../input';

const successAnimation = require('../../assets/icon/success_animation.json');
const backArrow = require('../../assets/icon/back_button.png');

function MintViaEmail({
  backgroundColor,
  label,
  onPress,
  onBack,
  id,
  userProfile,
}) {
  const [loadingMint, setLoadingMint] = useState(false);
  const [activeStep, setStep] = useState('mint');
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState(userProfile.data?.email || '');

  function validateEmail() {
    if (
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        email,
      )
    ) {
      return true;
    }
    return false;
  }

  const handleMint = async () => {
    setLoadingMint(true);
    const body = {
      email,
    };
    await mintViaEmail(id, body);
    setLoadingMint(false);
    setStep('success');
  };

  function renderBackButton() {
    return (
      <View style={styles.ctnBack}>
        <TouchableOpacity onPress={onBack}>
          <Image source={backArrow} style={styles.backIconStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderAnimation() {
    return (
      <View style={styles.ctnAnimation}>
        <LottieView
          source={successAnimation}
          autoPlay
          loop={false}
          style={styles.lottieStyle}
        />
      </View>
    );
  }
  if (activeStep === 'mint-via-apps') {
    return (
      <View style={styles.ctnRoot}>
        <View style={styles.topContainer}>
          <Text style={styles.txtTitle}>Mint on your phone</Text>
          <Text style={styles.txtDesc}>
            We recommend minting on desktop for now, but you can continue
            minting on your phone by clicking the link below to get to the
            minting page.
          </Text>
        </View>

        <View style={styles.phoneMintWrapper}>
          <Button
            btnStyle={{
              marginTop: moderateScale(20),
              marginBottom: 20,
              backgroundColor,
            }}
            onPress={onPress}
            isLoading={loadingMint}
            label={label}
          />
        </View>
        {renderBackButton()}
      </View>
    );
  }
  if (activeStep === 'success') {
    return (
      <View style={styles.ctnRoot}>
        {renderAnimation()}
        <View style={[styles.topContainer, styles.normalizePdTop]}>
          <Text style={[styles.txtTitle, styles.succesfullText]}>
            Successfully sent
          </Text>
          <Text style={styles.txtDesc}>
            {`Check your emails!\nYou should have received an email from us with the link to the mint.`}
          </Text>
        </View>

        <View style={styles.phoneMintWrapper}>
          <Button
            btnStyle={{
              marginTop: moderateScale(20),
              marginBottom: 20,
              backgroundColor,
            }}
            onPress={() => {
              openInbox();
            }}
            label="Open Emails"
          />
        </View>
        {renderBackButton()}
      </View>
    );
  }
  return (
    <View style={styles.ctnRoot}>
      <View style={styles.topContainer}>
        <Text style={styles.txtTitle}>
          Get your exclusive minting link in your inbox
        </Text>
        <Text style={styles.txtDesc}>
          {`You can directly mint here on your phone\nor we can send the exclusive link to your\nemail, so you can check it out on your\ndesktop and other devices.`}
        </Text>
      </View>

      {showInput && (
        <View style={styles.ctnInput}>
          <Input
            ctnRootStyle={styles.ctnInput}
            txtLimitStyle={styles.txtLimitStyle}
            ctnInputStyle={{borderColor: backgroundColor}}
            maxLength={100}
            value={email}
            onChangeText={value => {
              setEmail(value);
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      )}

      <View style={styles.mintWrapper}>
        <Button
          btnStyle={{
            marginTop: moderateScale(20),
            marginBottom: 0,
            backgroundColor,
          }}
          onPress={() => {
            if (!showInput) {
              setShowInput(true);
            } else {
              handleMint();
            }
          }}
          isDisable={showInput && !validateEmail()}
          isLoading={loadingMint}
          label={`${label} via Email Link`}
        />
        <TouchableOpacity
          style={styles.btnCancel}
          onPress={() => {
            setStep('mint-via-apps');
          }}>
          <Text style={styles.txtMintCancel}>No, thanks</Text>
        </TouchableOpacity>
      </View>
      {renderBackButton()}
    </View>
  );
}

export default connect(states)(MintViaEmail);

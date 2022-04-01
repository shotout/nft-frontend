import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';

export default function SignIn() {
  const [activeStep, setActiveStep] = useState('signin');

  function getLabel() {
    if (activeStep === 'success') {
      return 'Go Back';
    }
    return 'Continue';
  }

  function renderContent() {
    if (activeStep === 'success') {
      return (
        <>
          <Title label="Success, an email with the login link has been sent to your account." />
          <View style={styles.ctnDesc}>
            <Text style={styles.txtDesc}>
              {`To continue, open your emails and click on the link provided.\n\nMake sure to also check your spam folder, if you cannot find it.`}
            </Text>
          </View>
        </>
      );
    }
    return (
      <>
        <Title
          label={`Got an account already?\nLogin by entering your email below.`}
        />
        <Input
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
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
      <Button
        label={getLabel()}
        onPress={() => {
          setActiveStep(activeStep === 'signin' ? 'success' : 'signin');
        }}
      />
    </View>
  );
}

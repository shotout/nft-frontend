import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Button from '../../components/button';
import Header from '../../components/header';
import Input from '../../components/input';
import Title from '../../layout/auth/title';
import styles from './styles';
import {goBack, navigate, reset} from '../../helpers/navigationRef';
import {postLogin} from '../../helpers/requests';
import arrayErrorResturctor from '../register/responseValidatorArr';

export default function SignIn() {
  const [activeStep, setActiveStep] = useState('signin');
  const [isLoading, selectedLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
  });
  const [error, setError] = useState({
    email: null,
  });

  const handleBack = () => {
    switch (activeStep) {
      case 'signin':
        goBack();
        break;
      default:
        setActiveStep('signin');
        break;
    }
  };

  const handleChangeText = (stateName, value) => {
    setValues({...values, [stateName]: value});
  };

  const handleSubmit = async () => {
    try {
      selectedLoading(true);
      const body = {
        ...values,
      };
      await postLogin(body);
      setActiveStep('success');
      selectedLoading(false);
    } catch (err) {
      if (err.data.errors) {
        const errorRes = arrayErrorResturctor(err.data.errors);
        setError(errorRes);
      }
      selectedLoading(false);
    }
  };

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
          maxLength={100}
          placeholder="Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={values.email}
          error={error.email}
          onChangeText={value => {
            handleChangeText('email', value);
          }}
        />
      </>
    );
  }

  return (
    <View style={styles.ctnRoot}>
      <View style={styles.ctnTop}>
        <Header hideLeft={activeStep === 'success'} backPress={handleBack} />
        <ScrollView style={styles.ctnRoot}>{renderContent()}</ScrollView>
      </View>
      <Button
        isLoading={isLoading}
        label={getLabel()}
        onPress={() => {
          if (activeStep === 'success') {
            reset('Homepage');
          } else {
            handleSubmit();
          }
        }}
      />
    </View>
  );
}

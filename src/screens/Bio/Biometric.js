import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as Biometrics from 'react-native-biometrics';

const Biometric = () => {
  const [biometricType, setBiometricType] = useState(null);

  const checkBiometrics = async () => {
    try {
      const { available, biometryType } = await Biometrics.isSensorAvailable();

      if (available && biometryType) {
        setBiometricType(biometryType);
      } else {
        console.log('Biometrics not available on this device.');
      }
    } catch (error) {
      console.error('Biometrics check error:', error);
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const { success } = await Biometrics.simplePrompt({
        promptMessage: 'Authenticate to log in.',
      });

      if (success) {
        // Authentication successful, proceed with login logic
        console.log('Biometric authentication successful');
      } else {
        console.log('Biometric authentication failed or cancelled.');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Biometric Type: {biometricType || 'Not available'}</Text>
      <Button title="Check Biometrics" onPress={checkBiometrics} />
      <Button
        title="Authenticate with Biometrics"
        onPress={authenticateWithBiometrics}
        disabled={!biometricType}
      />
    </View>
  );
};

export default Biometric;

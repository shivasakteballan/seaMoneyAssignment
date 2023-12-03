const checkBiometrics = async () => {
  try {
    const {available, biometryType} = await Biometrics.isSensorAvailable();

    if (available && biometryType) {
      // setBiometricType(biometryType);
      return biometryType;
    } else {
      console.log('Biometrics not available on this device.');
    }
  } catch (error) {
    console.error('Biometrics check error:', error);
    return error;
  }
};

const authenticateWithBiometrics = async () => {
  try {
    const {success} = await Biometrics.simplePrompt({
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

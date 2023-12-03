import { Alert } from 'react-native';
import Biometrics from 'react-native-biometrics';

export const checkBiometrics = async () => {
  try {
    const {available, biometryType} = await Biometrics.isSensorAvailable();
    if (available) {
      loginBiometrics(biometryType);
    } else {
      // Biometric authentication not available
      // fallback to username/password login 
      Alert.alert('Biometrics authentication not available', 'Please login using username and password.', [
        {text: 'OK'},
      ]);
    }
  } catch (error) {
    Alert.alert('Biometrics check error.', [
      {text: 'OK'},
    ]);
    return error;
  }
};

export const loginBiometrics = async (biometryType) => {
  const result = await Biometrics.simplePrompt({
    promptMessage: 'Authenticate to log in.',
  });

  if (result.success) {
    // Biometric authentication successful
    return biometryType;
  } else {
    // Biometric authentication failed
    Alert.alert('Biometrics authentication failed', 'Please try again or use username and password to login.', [
      {text: 'OK'},
    ]);
    return false;
  }
}
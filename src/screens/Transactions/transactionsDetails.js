import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {maskSensitiveInfo} from '../../utilities/utilities';
import {checkBiometrics, loginBiometrics} from '../../utilities/biometrics';

const TransactionDetailsScreen = ({route}) => {
  const {transaction, biometricType} = route.params || {};
  const [amount, setAmount] = useState(maskSensitiveInfo(transaction?.amount));
  const [account, setAccount] = useState(
    maskSensitiveInfo(transaction?.beneficiaryAccount),
  );
  const [masked, toggleMask] = useState(true);
  const [biometricsLogged, setBiometricsLogged] = useState(false);

  const unMaskInfo = masked => {
    if (biometricsLogged) {
      if (masked) {
        toggleMask(false);
        setAmount(transaction?.amount);
        setAccount(transaction?.beneficiaryAccount);
      } else {
        toggleMask(true);
        setAmount(maskSensitiveInfo(transaction?.amount));
        setAccount(maskSensitiveInfo(transaction?.beneficiaryAccount));
      }
    } else {
      Alert.alert(
        'Biometrics Authentication',
        'Press OK to login using Face/Touch ID to view account & amount.',
        [
          {
            text: 'OK',
            onPress: async () => {
              if (biometricType) {
                loginBiometrics(biometricType);
              } else {
                try {
                  const biometricType = await checkBiometrics();
                  if (biometricType) {
                    const result = loginBiometrics(biometricType);
                    if (result) {
                      setBiometricsLogged(true);
                    } else {
                      Alert.alert(
                        'Biometrics Auth Error',
                        'Please try again!',
                        [{text: 'OK'}],
                      );
                    }
                  } else {
                    Alert.alert('Biometrics Auth Error', 'Please try again!', [
                      {text: 'OK'},
                    ]);
                  }
                } catch {
                  Alert.alert(
                    'Biometrics Auth not available',
                    'Please try again!',
                    [{text: 'OK'}],
                  );
                }
              }
            },
          },
          {
            text: 'Cancel',
          },
        ],
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction Details</Text>
      <Text>Date: {transaction?.date}</Text>
      <Text>Description: {transaction?.description}</Text>
      <Text>Account: {account}</Text>
      <View style={styles.rowComponent}>
        <Text>Amount: RM {amount}</Text>
        <TouchableOpacity onPress={() => unMaskInfo(masked)}>
          {masked ? (
            <Icon
              name="eye-slash"
              size={20}
              color="#808080"
              style={{paddingLeft: 10}}
            />
          ) : (
            <Icon
              name="eye"
              size={20}
              color="#808080"
              style={{paddingLeft: 10}}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text>Transfer type: {transaction?.transferType}</Text>
      <Text>Additional Details: {transaction?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  rowComponent: {
    flexDirection: 'row',
  },
});

export default TransactionDetailsScreen;

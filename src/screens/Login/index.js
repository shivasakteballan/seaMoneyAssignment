import React, {useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { signInWithEmailAndPassword } from '../../services/apiServiceDefinition';
import { checkBiometrics } from '../../utilities/biometrics';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState();

  const [emailAdd, setEmailAdd] = useState();
  const [password, setPassword] = useState();

  const [biometricType, setBiometricType] = useState(null);

  const loginBiometrics = async () => {
    Alert.alert('Biometrics Authentication', 'Do you want to login using Face/Touch ID?', [
      {
        text: 'OK',
        onPress: async () => {
          try {
            const biometricType = await checkBiometrics();
            if (biometricType) {
              setBiometricType(biometricType);
              setUser(biometricType);
            } else {
              Alert.alert('Biometrics Auth Error', 'Please try again!', [
                {text: 'OK'},
              ]);
            }
          } catch {
            Alert.alert('Biometrics Auth not available', 'Please try again!', [
              {text: 'OK'},
            ]);
          }
        },
      },
      {
        text: 'Cancel'
      }
    ]);
    
  }

  const login = async () => {
    if (emailAdd !== null && emailAdd?.trim().length > 3) {
      try {
        const response = await signInWithEmailAndPassword(emailAdd, password);
        if (response) {
          setUser(response);
          setEmailAdd(null);
          setPassword(null);
          Alert.alert('Login Successful', 'Welcome!', [
            {
              text: 'OK',
            },
          ]);
        } else {
          Alert.alert('Login Unsuccessful', 'Please try again!', [
            {text: 'OK'},
          ]);
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Login Error', 'That email address is already in use!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Login Error', 'That email address is invalid!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        }

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Login Error', 'User password is wrong!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        }
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Login Error', 'User not found!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        } else {
          Alert.alert('Login Error', 'Service not available at the moment.', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        }
      }
    } else {
      Alert.alert(
        'Login Error',
        'Please type in your correct e-mail address and password!',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK'},
        ],
      );
    }
  };

  if (!user) {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require('../../assets/background/background.jpg')}
          resizeMode="cover"
          style={styles.background}>
          <View style={styles.loginContainer}>
            <TextInput
              style={styles.loginTextInputContainer}
              onChangeText={text => setEmailAdd(text.toLowerCase())}
              value={emailAdd}
              placeholder="  e-Mail Address  "
            />
            <TextInput
              style={styles.loginTextInputContainer}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="  Password  "
              secureTextEntry={true}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 25,
              }}>
              <TouchableOpacity style={styles.button} onPress={loginBiometrics}>
                <Text style={{color: 'white', fontSize: 20}}>TOUCH/FACE ID</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <TouchableOpacity style={styles.button} onPress={login}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: 20,
            }}>
            <Text style={{color: 'white', fontSize: 20}}>LOGIN</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    navigation.navigate('Dashboard');
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    flex: 1,
    opacity: 0.9,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  loginContainer: {
    flex: 0.3,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 30,
    padding: 10,
  },
  loginTextInputContainer: {
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 10,
    alignItems: 'center',
    height: 60,
    margin: 5,
  },
  loginButton: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default LoginScreen;

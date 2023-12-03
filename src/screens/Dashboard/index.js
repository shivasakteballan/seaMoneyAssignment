import React from 'react';
import { StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import transactionHistory from '../Transactions/transactionHistory';
import Home from '../Home/home';

const Tab = createBottomTabNavigator();

const Dashboard = ({biometricType}) => {
  
    return (
      <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Account"
            initialParams={{biometricType}} // Pass the parameter here
            component={transactionHistory}
            options={{
              tabBarLabel: 'Account',
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="bank"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
    );
  };
  
  const styles = StyleSheet.create({
    header: {
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });

export default Dashboard;
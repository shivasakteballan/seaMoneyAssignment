import React, {useState} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity, RefreshControl, ToastAndroid} from 'react-native';
import axios from 'axios';

import {maskSensitiveInfo} from '../../utilities/utilities';
import {transactionData} from '../../assets/constants/dummyJson';

const TransactionHistory = ({navigation, route}) => {
  const [listData, setListData] = useState(transactionData);
  const [refreshing, setRefreshing] = useState(false);
  const biometricType = route?.params?.biometricType || {};

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (Object.keys(listData).length < 4) {
      try {
        const response = await axios.get('https://run.mocky.io/v3/38e1c35c-d128-4332-8f71-b6a01497f71f');
        const mergedObject = {};

        for (const key in transactionData) {
          if (Array.isArray(transactionData[key]) && Array.isArray(response?.data[key])) {
            mergedObject[key] = transactionData[key].concat(response?.data[key]);
          } else {
            mergedObject[key] = transactionData[key];
          }
        }

        for (const key in response?.data) {
          if (!transactionData.hasOwnProperty(key)) {
            mergedObject[key] = response?.data[key];
          }
        }
        setRefreshing(false)
        setListData(mergedObject);
      } catch (error) {
        console.error(error);
      }
    }
    else{
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false)
    }
  }, [refreshing]);

  const handleTransactionPress = transaction => {
    navigation.navigate('TransactionDetails', {transaction, biometricType});
  };

  const renderTransactionGroup = ({item}) => (
    <View style={styles.transactionGroup}>
      <Text style={styles.groupDate}>{item.date}</Text>
      {item.transactions.map(transaction => (
        <TouchableOpacity onPress={() => handleTransactionPress(transaction)}>
          <View key={transaction.referenceId} style={styles.transactionItem}>
            <Text>Description: {transaction.description}</Text>
            <Text>Amount: RM {maskSensitiveInfo(transaction.amount)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={Object.keys(listData).map(date => ({
          date,
          transactions: listData[date],
        }))}
        renderItem={renderTransactionGroup}
        keyExtractor={item => item.date}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
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
  transactionItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'right',
  },
});

export default TransactionHistory;

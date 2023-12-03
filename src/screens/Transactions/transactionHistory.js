import React from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';

import {maskSensitiveInfo} from '../../utilities/utilities';
import {transactionData} from '../../assets/constants/dummyJson';

const TransactionHistory = ({navigation, route}) => {
  const biometricType = route?.params?.biometricType || {};
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
        data={Object.keys(transactionData).map(date => ({
          date,
          transactions: transactionData[date],
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

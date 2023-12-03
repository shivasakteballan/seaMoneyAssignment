import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Home = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
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
});

export default Home;

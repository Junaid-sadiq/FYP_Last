import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../../../config/colors';


import { View } from './View';

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.red} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

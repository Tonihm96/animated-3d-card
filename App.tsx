import React from 'react';
import { StyleSheet, StatusBar, Dimensions, View } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { BackgroundGradient } from './src/components/BackgroundGradient';
import { Card } from './src/components/Card';

const CONTAINER_HEIGHT = 256;
const CONTAINER_WIDTH = Dimensions.get('screen').width * 0.9;

const CARD_HEIGHT = CONTAINER_HEIGHT - 5;
const CARD_WIDTH = CONTAINER_WIDTH - 5;

function App() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      <BackgroundGradient height={CONTAINER_HEIGHT} width={CONTAINER_WIDTH} />
      <Card height={CARD_HEIGHT} width={CARD_WIDTH} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  }
});

export default gestureHandlerRootHOC(App);

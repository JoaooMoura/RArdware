import React, { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { initDatabase } from '@db';
import { RootNavigator } from '@navigation';

function App(): React.JSX.Element {
  useEffect(() => {
    async function bootstrap() {
      try {
        await initDatabase();
      } catch (err: unknown) {
        console.warn('Database initialization warning:', err);
      }
    }
    bootstrap();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

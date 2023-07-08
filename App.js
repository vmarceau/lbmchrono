import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StopWatch from './components/Stopwatch';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StopWatch />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

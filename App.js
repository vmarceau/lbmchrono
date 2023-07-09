import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Stopwatch from './components/Stopwatch';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stopwatch />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

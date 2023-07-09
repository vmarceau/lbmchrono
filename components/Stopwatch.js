import { useState, useRef, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import Result from './Result';
import Bibs from './Bibs';
import Control from './Control';
import { displayTime, getElapsedTime, initResults } from './utils';
import MyHeader from './Header';

export default function Stopwatch() {
  const startTime = useRef(null);
  const timer = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [isRunning, setRunning] = useState(false);
  const [results, setResults] = useState(initResults());

  const handleBibButtonPress = useCallback(
    (id) => {
      if (!isRunning) {
        return;
      }

      const newResults = [...results].map((r) =>
        r.id === id
          ? { ...r, elapsed: r.elapsed === null ? getElapsedTime(startTime.current) : null }
          : r
      );
      setResults(newResults);
    },
    [isRunning, results]
  );

  const handleResetButtonPress = useCallback(() => {
    if (isRunning) {
      return;
    }

    startTime.current = null;
    setElapsedTime(null);
    setResults(initResults());
  }, [isRunning]);

  const handleSaveButtonPress = useCallback(() => {
    if (isRunning) {
      return;
    }

    console.log('Not implemented');
  }, [isRunning]);

  const handleStartStopButtonPress = useCallback(() => {
    if (!isRunning) {
      startTime.current = Date.now();
      const interval = setInterval(() => {
        setElapsedTime((prev) => {
          const next = getElapsedTime(startTime.current);
          // Avoid updating elapsed time state too often to minimize rendering
          return next - prev > 1000 ? next : prev;
        });
      }, 100);
      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }

    setRunning((prev) => !prev);
  }, [isRunning]);

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayTime(elapsedTime)}</Text>
      </View>
      <View style={styles.bibs}>
        <Bibs results={results} handleBibButtonPress={handleBibButtonPress} />
      </View>
      <View style={styles.control}>
        <Control
          isRunning={isRunning}
          handleResetButtonPress={handleResetButtonPress}
          handleStartStopButtonPress={handleStartStopButtonPress}
          handleSaveButtonPress={handleSaveButtonPress}
        />
      </View>
      <View style={styles.result}>
        <Result results={results} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Constants.statusBarHeight,
  },
  display: {
    flex: 1 / 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    color: '#fff',
    fontSize: 70,
    fontWeight: '200',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : null,
  },
  bibs: {
    flex: 3 / 6,
    flexDirection: 'row',
  },
  control: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  result: { flex: 2 / 6 },
});

/* eslint-disable react/style-prop-object */
import { useState, useRef, useCallback } from 'react';
import { Alert, StyleSheet, SafeAreaView, Text, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as MailComposer from 'expo-mail-composer';
import * as FileSystem from 'expo-file-system';
import Result from './Result';
import Bibs from './Bibs';
import Control from './Control';
import { displayTime, formatRaceResults, getElapsedTime, initResults } from './utils';
import BmHeader from './Header';
import { EMAIL_BODY, EMAIL_RECIPIENTS, EMAIL_SUBJECT } from './constants';

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

  const handleSaveButtonPress = useCallback(async () => {
    if (isRunning || !startTime.current) {
      return;
    }

    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Not available', 'Please configure an email account on your phone', [
        { text: 'I understand', onPress: () => {} },
      ]);
      return;
    }

    const finalResults = formatRaceResults(startTime.current, results);

    const uri = `${FileSystem.documentDirectory}LBM_${new Date().toISOString()}.json`;
    await FileSystem.writeAsStringAsync(uri, JSON.stringify(finalResults, null, 2));

    let emailBody = `${EMAIL_BODY}\n\n---\n`;
    emailBody += `Rank -- Bib -- Name -- Gender -- Time\n`;
    emailBody += finalResults.leaderboard
      .map((r) => `${r.rank}. -- Bib #${r.bib} -- ${r.name} -- ${r.gender} -- ${r.elapsed}`)
      .join('\n');

    MailComposer.composeAsync({
      subject: EMAIL_SUBJECT,
      body: emailBody,
      recipients: EMAIL_RECIPIENTS ? EMAIL_RECIPIENTS.split(',') : undefined,
      attachments: [uri],
      isHtml: false,
    });
  }, [isRunning, results]);

  const handleStartStopButtonPress = useCallback(() => {
    if (!isRunning) {
      if (!startTime.current) {
        startTime.current = Date.now();
      }

      const interval = setInterval(() => {
        setElapsedTime((prev) => {
          const next = getElapsedTime(startTime.current);
          // Avoid updating elapsed time state too often to minimize rendering
          return next - prev > 1000 ? next : prev;
        });
      }, 50);
      timer.current = interval;
    } else {
      clearInterval(timer.current);
    }

    setRunning((prev) => !prev);
  }, [isRunning]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <BmHeader />
      </View>
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayTime(elapsedTime)}</Text>
      </View>
      <View style={styles.bibs}>
        <Bibs results={results} handleBibButtonPress={handleBibButtonPress} />
      </View>
      <View style={styles.control}>
        <Control
          isRunning={isRunning}
          isResults={!!startTime.current}
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
    backgroundColor: '#000',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flex: 12 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  display: {
    flex: 12 / 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  displayText: {
    color: '#fff',
    fontSize: 72,
    fontWeight: '300',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : null,
    includeFontPadding: false,
  },
  bibs: {
    flex: 40 / 100,
    flexDirection: 'row',
  },
  control: {
    flex: 14 / 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  result: { flex: 22 / 100 },
});

import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { displayTime } from './utils';

function Result({ results }) {
  return (
    <ScrollView>
      {[...results]
        .filter((r) => r.elapsed !== null)
        .sort((l, r) => l.elapsed - r.elapsed)
        .map((r, idx) => (
          <View key={r.id} style={styles.resultItem}>
            <Text style={styles.resultItemText}>{idx + 1}</Text>
            <Text style={styles.resultItemText}>Bib #{r.id}</Text>
            <Text style={styles.resultItemText}>{displayTime(r.elapsed)}</Text>
          </View>
        ))
        .reverse()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#313131',
    height: 42,
    paddingHorizontal: 30,
  },
  resultItemText: { color: '#fff' },
});

export default React.memo(Result);

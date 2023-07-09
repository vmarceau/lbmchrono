import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { displayTime } from './utils';

function Result({ results }) {
  return (
    <ScrollView>
      <View style={styles.resultItem} />
      {[...results]
        .filter((r) => r.elapsed !== null)
        .sort((l, r) => l.elapsed - r.elapsed)
        .map((r, idx) => (
          <View key={r.id} style={styles.resultItem}>
            <Text style={styles.resultItemText}>Rank {idx + 1}</Text>
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
    borderBottomWidth: 1,
    borderColor: '#313131',
    height: 50,
    paddingHorizontal: 15,
  },
  resultItemText: { color: '#fff' },
});

export default React.memo(Result);

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Bibs({ isRunning, runners }) {
  const bibs = runners.map((runner) => (
    <TouchableOpacity
      key={runner.id}
      style={[styles.controlButtonBorder, { backgroundColor: runner.time ? '#333333' : '#002e56' }]}
      onPress={isRunning ? () => {} : () => {}}
    >
      <View style={styles.controlButton}>
        <Text style={{ color: runner.time ? '#fff' : '#0088ff' }}>{`${runner.id}`}</Text>
      </View>
    </TouchableOpacity>
  ));

  return <View style={styles.container}>{bibs}</View>;
}

const CENTER = {
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  container: {
    ...CENTER,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  controlButtonBorder: {
    ...CENTER,
    width: 40,
    height: 40,
    borderRadius: 40,
    margin: 5
  },
  controlButton: {
    ...CENTER,
    width: 35,
    height: 35,
    borderRadius: 35,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default React.memo(Bibs);

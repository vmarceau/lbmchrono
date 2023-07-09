import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Bibs({ results, handleBibButtonPress }) {
  const bibs = results.map((result) => (
    <TouchableOpacity
      key={result.id}
      style={[styles.controlButtonBorder, { backgroundColor: result.time ? '#333333' : '#002e56' }]}
      onPress={() => handleBibButtonPress(result.id)}
    >
      <View style={styles.controlButton}>
        <Text style={{ color: result.time ? '#fff' : '#0088ff' }}>{`${result.id}`}</Text>
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
    width: 30,
    height: 30,
    borderRadius: 30,
    margin: 5,
  },
  controlButton: {
    ...CENTER,
    width: 25,
    height: 25,
    borderRadius: 25,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default React.memo(Bibs);

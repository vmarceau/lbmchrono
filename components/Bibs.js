import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  COLOR_BIB_BTN_BG,
  COLOR_BIB_BTN_TEXT,
  COLOR_SECONDARY_BTN_BG,
  COLOR_SECONDARY_BTN_TEXT,
} from './constants';

function Bibs({ results, handleBibButtonPress }) {
  const bibs = results.map((r) => (
    <TouchableOpacity
      key={r.id}
      style={[
        styles.controlButtonBorder,
        { backgroundColor: r.elapsed ? COLOR_SECONDARY_BTN_BG : COLOR_BIB_BTN_BG },
      ]}
      onPress={() => handleBibButtonPress(r.id)}
    >
      <View style={styles.controlButton}>
        <Text
          style={{ color: r.elapsed ? COLOR_SECONDARY_BTN_TEXT : COLOR_BIB_BTN_TEXT }}
        >{`${r.id}`}</Text>
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
    width: 32,
    height: 32,
    borderRadius: 32,
    margin: 5,
  },
  controlButton: {
    ...CENTER,
    width: 27,
    height: 27,
    borderRadius: 27,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default React.memo(Bibs);

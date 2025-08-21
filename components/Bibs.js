import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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

const { width: screenWidth } = Dimensions.get('window');
const buttonsPerRow = 8;
const spacing = 10;
const buttonSize = (0.95 * screenWidth - spacing * (buttonsPerRow + 1)) / buttonsPerRow;

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
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
    margin: spacing / 2,
  },
  controlButton: {
    ...CENTER,
    width: buttonSize * 0.8,
    height: buttonSize * 0.8,
    borderRadius: buttonSize * 0.8,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default React.memo(Bibs);

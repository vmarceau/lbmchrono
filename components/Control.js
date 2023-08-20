import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  COLOR_SECONDARY_BTN_BG,
  COLOR_SECONDARY_BTN_TEXT,
  COLOR_START_BTN_BG,
  COLOR_START_BTN_TEXT,
  COLOR_STOP_BTN_BG,
  COLOR_STOP_BTN_TEXT,
} from './constants';

function Control({
  isRunning,
  isResults,
  handleResetButtonPress,
  handleStartStopButtonPress,
  handleSaveButtonPress,
}) {
  const renderReset = () => {
    if (isRunning || !isResults) {
      return undefined;
    }

    return (
      <TouchableOpacity
        style={[styles.controlButtonBorder, { backgroundColor: COLOR_SECONDARY_BTN_BG }]}
        onPress={handleResetButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: COLOR_SECONDARY_BTN_TEXT }}>Reset</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSave = () => {
    if (isRunning || !isResults) {
      return undefined;
    }

    return (
      <TouchableOpacity
        style={[styles.controlButtonBorder, { backgroundColor: COLOR_SECONDARY_BTN_BG }]}
        onPress={handleSaveButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: COLOR_SECONDARY_BTN_TEXT }}>Send</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderReset()}
      <TouchableOpacity
        style={[
          styles.controlButtonBorder,
          { backgroundColor: isRunning ? COLOR_STOP_BTN_BG : COLOR_START_BTN_BG },
        ]}
        onPress={handleStartStopButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: isRunning ? COLOR_STOP_BTN_TEXT : COLOR_START_BTN_TEXT }}>
            {isRunning ? 'Stop' : isResults ? 'Resume' : 'Start'}
          </Text>
        </View>
      </TouchableOpacity>
      {renderSave()}
    </>
  );
}

const CENTER = {
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = StyleSheet.create({
  controlButtonBorder: {
    ...CENTER,
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  controlButton: {
    ...CENTER,
    width: 65,
    height: 65,
    borderRadius: 65,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default React.memo(Control);

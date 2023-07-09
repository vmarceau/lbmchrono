import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Control({
  isRunning,
  handleResetButtonPress,
  handleStartStopButtonPress,
  handleSaveButtonPress,
}) {
  const renderReset = () => {
    if (isRunning) {
      return undefined;
    }

    return (
      <TouchableOpacity
        style={[styles.controlButtonBorder, { backgroundColor: '#1c1c1e' }]}
        onPress={handleResetButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: '#9d9ca2' }}>Reset</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSave = () => {
    if (isRunning) {
      return undefined;
    }

    return (
      <TouchableOpacity
        style={[styles.controlButtonBorder, { backgroundColor: '#1c1c1e' }]}
        onPress={handleSaveButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: '#9d9ca2' }}>Save</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderReset()}
      <TouchableOpacity
        style={[styles.controlButtonBorder, { backgroundColor: isRunning ? '#340e0d' : '#0a2a12' }]}
        onPress={handleStartStopButtonPress}
      >
        <View style={styles.controlButton}>
          <Text style={{ color: isRunning ? '#ea4c49' : '#37d05c' }}>
            {isRunning ? 'Stop' : 'Start'}
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

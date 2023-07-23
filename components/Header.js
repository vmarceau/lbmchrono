import { Image, StyleSheet, View } from 'react-native';

function BmHeader() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/lbmheader.png')}
        style={{ marginVertical: 10, resizeMode: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    height: 72,
  },
});

export default BmHeader;

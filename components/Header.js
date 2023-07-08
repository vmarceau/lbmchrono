import { Appbar } from 'react-native-paper';

function MyHeader() {
  return (
    <Appbar.Header style={{ backgroundColor: 'black' }}>
      <Appbar.Content title="🏃 🍺" style={{ alignItems: 'center' }} />
    </Appbar.Header>
  );
}

export default MyHeader;

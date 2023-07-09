import { Appbar } from 'react-native-paper';

function MyHeader() {
  return (
    <Appbar.Header style={{ backgroundColor: 'black', height: 35 }}>
      <Appbar.Content title="🏃 Limoilou Beer Mile 🍺" color='#fff' style={{ alignItems: 'center' }} />
    </Appbar.Header>
  );
}

export default MyHeader;

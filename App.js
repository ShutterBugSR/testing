import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Otp from './files';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Otp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

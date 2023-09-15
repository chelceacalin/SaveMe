import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Button } from 'react-native-elements';

export default function HomeScreen({navigation}) {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Welcome !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { StyleSheet, Text, View,Button } from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth();

export default function HomeScreen({navigation}) {
  const { user } = useAuthentication();
  return (
    <View style={styles.container}>
      <Text>Welcome {user?.email}!</Text>
      <Button title="CHAT"  onPress={() => navigation.navigate('conversations')} />
      <Button title="Sign Out" style={styles.signOut} onPress={() => signOut(auth)} />
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
  signOut:{
    marginTop:10,
    margin:'auto'
  }
});
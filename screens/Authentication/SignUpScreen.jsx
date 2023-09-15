import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref,set,push } from '@firebase/database';
import { db } from '../../config/firebase';


const auth = getAuth()

const SignUpScreen  = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [phone,setPhone]=useState("")
  let validateAndSet = (value,setValue) => {
   setValue(value)
}




async function createAccount() {
  if (email === '' || password === '') {
    setValidationMessage('Required fields are missing');
    return;
  }

  try {
    let userKey;
    let success = false;
    await createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        success = true;
        userKey = credential.user.uid;
      
      
        const newUserEntry = {
          id: userKey,
          email: email,
          password: password,
          phone: phone,
        };



        set(ref(db, `users/${userKey}`), newUserEntry);
      });

    if (success) {
      setEmail('');
      setPassword('');
      setValidationMessage('');
      navigation.navigate('Sign In');
    } else {
      setValidationMessage('User account creation failed');
    }
  } catch (error) {
    setValidationMessage(error.message);
  }
}



  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder='Email'
          containerStyle={{marginTop: 10,backgroundColor:'white',width:'auto'}}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<Icon name='envelope' size={16}/>}
            />
        <Input
          placeholder='Password'
          containerStyle={{marginTop: 10,backgroundColor:'white',width:'auto'}}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
          leftIcon={<Icon name='key' size={16}/>}
            />

       <Input
          placeholder='Phone Number'
          containerStyle={{marginTop: 10,backgroundColor:'white',width:'auto'}}
          value={phone}
          onChangeText={(value) => setPhone(value)}
          leftIcon={<Icon name='key' size={16}/>}
            />


            {<Text style={styles.error}>{validationMessage}</Text>}
        <Button title="Sign up" buttonStyle={{marginTop:10}} onPress={createAccount} />
        <View>
          <Text style={{marginTop:5,fontSize:17}}>Already have an account?
          <TouchableOpacity onPress={()=>navigation.navigate('Sign In')} style={{color:'blue',marginLeft:10}}>
               <Text>Login here </Text> 
          </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom:50,
  },
  error: {
    marginTop: 10,
    color: 'red',
  }
});

export default SignUpScreen;
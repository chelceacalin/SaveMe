import { StyleSheet, Text, View,Button,TextInput} from 'react-native';
import { useAuthentication } from '../../hooks/useAuthentication';
import { getAuth } from 'firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { db } from '../../config/firebase';
import { set, ref, onValue, remove} from "firebase/database";



const auth = getAuth();

export default function LoudEmergencyConfig() {
  const { user } = useAuthentication();

  const [persons, setPersons] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [activeModalPersonName, setActiveModalPersonName] = useState(null);
  const [activeModalPersonPhoneNumber, setActiveModalPersonPhoneNumber] = useState(null);


  const openUserModal = (person) => {
    setActiveModalPersonName(person.name);
    setActiveModalPersonPhoneNumber(person.phoneNumber);
    setUserModalVisible(true);
  };


    useEffect(() => {
        const getContacts = ref(db, `loudEmergencyContacts/${auth.currentUser.uid}/${phoneNumber}`);

        onValue(getContacts, (snapshot) => {
            const data = snapshot.val();
            const tempPersons = [];
            for (let id in data) {
                
                tempPersons.push(data[id]);
            }
            setPersons(tempPersons);
            console.log("persons " + persons)
            console.log(data);
            });

    }, []);

  return (
    <View style={styles.container}>
      <Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>Loud Emergency Contact List</Text>

      <TouchableHighlight 
          style={styles.addContact}
            onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}> Add New Contact </Text>
        </TouchableHighlight>
        <ScrollView style={styles.scrollContainer}> 

        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={{marginTop: 22, alignItems: 'center'}}>
            <View>
              <Text style={{marginTop:'50%', fontSize:20}}>Add New Contact</Text>
              <TextInput placeholder="Name" style={styles.modalItems} onChangeText={setName}/>
              <TextInput placeholder="Phone Number" style={styles.modalItems} onChangeText={setPhoneNumber}/>

              <View style={{width:"100%",display:'flex',flexDirection:'row',marginTop:20,alignContent:'center',justifyContent:'center'}}>

                <TouchableHighlight
                    style = {{backgroundColor:"grey", padding:10, display:'inline-block',margin:3}}
                    onPress={() => {
                    setModalVisible(false);

                    }}>
                    <Text>Close</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style = {{backgroundColor:"green", padding:10, display:'inline-block',margin:3}}
                    onPress={() => {
                    setModalVisible(false);
                    console.log(name);
                    console.log(phoneNumber);
                    const newUserEntry = {
                    name : name,
                    phoneNumber : phoneNumber,
                    };

                    set(ref(db, `loudEmergencyContacts/${auth.currentUser.uid}/${phoneNumber}`), newUserEntry);

                    }}>
                    <Text>Save</Text>
                </TouchableHighlight>

                </View>
            </View>
          </View>
        </Modal>

        {persons.map((person) => (
            <View key={person?.phoneNumber} style={{backgroundColor : "#1b3a4f" }}>
            <TouchableHighlight
                    onPress={() => openUserModal(person)}
                >
                <Text style={styles.item} key={person.phoneNumber}>{person.name}</Text>
            </TouchableHighlight>

            <Modal 
                animationType="fade"
                transparent={false}
                visible={userModalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                    setUserModalVisible(false);
                }}>
                <View style={{marginTop: 22, alignItems: 'center'}}>
                    <View>
                    <Text style={{marginTop:'50%', fontSize:20}}>User Details</Text>
                    <TextInput value={activeModalPersonName} style={styles.modalItems} onChangeText={setActiveModalPersonName}/>
                    <TextInput value={activeModalPersonPhoneNumber} style={styles.modalItems} onChangeText={setActiveModalPersonPhoneNumber}/>

                    <View style={{width:"100%",display:'flex',flexDirection:'row',marginTop:20,alignContent:'center',justifyContent:'center'}}>
                        <TouchableHighlight
                            style = {{backgroundColor:"grey", padding:10, display:'inline-block', margin:3}}
                            onPress={() => {
                            setUserModalVisible(false);
                            setActiveModalPersonName('');
                            setActiveModalPersonPhoneNumber('');
                            }}>
                            <Text 
                            style = {{color:"white"}}
                            >Cancel</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style = {{backgroundColor:"green", padding:10, display:'inline-block',margin:3}}
                            onPress={() => {
                            setUserModalVisible(false);

                            const newUserEntry = {
                                name : activeModalPersonName,
                                phoneNumber : activeModalPersonPhoneNumber,
                            };
                            console.log(newUserEntry)
                            set(ref(db, `loudEmergencyContacts/${auth.currentUser.uid}/${activeModalPersonPhoneNumber}`), newUserEntry);

                            setActiveModalPersonName('');
                            setActiveModalPersonPhoneNumber('');

                            }}>
                            <Text 
                            style = {{color:"white"}}
                            >Edit</Text>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style = {{backgroundColor:"red", padding:10, display:'inline-block',margin:3}}
                            onPress={() => {
                            set(ref(db, `loudEmergencyContacts/${auth.currentUser.uid}/${activeModalPersonPhoneNumber}`), null);
                            setUserModalVisible(false);
                            setActiveModalPersonName('');
                            setActiveModalPersonPhoneNumber('');
                            }}>
                            <Text 
                            style = {{color:"white"}}
                            >Delete</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </View>
            </Modal>
            
            </View>

        ))}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b3a4f",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
  scrollContainer: {
    backgroundColor: '#1b3a4f',
    width: '100%',
  },
  addContact:{
    marginTop:10,
    marginBottom:20,
    padding:10,
    margin:'auto',
    backgroundColor:'black',
  },
  buttonText:{
    color:'white'
  },
  item: {
    padding: 10,
    fontSize: 15,
    marginTop: 5,
    backgroundColor:'white',
    fontWeight:'bold',
  },
  modalItems:{
    margin:20,
  }
});
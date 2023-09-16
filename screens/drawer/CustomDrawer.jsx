import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { getAuth,signOut } from 'firebase/auth';
import { Dimensions } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

let ScreenHeight = Dimensions.get("window").height;

function CustomDrawerContent(props) {

  const auth = getAuth();

  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <View style={styles.container}>

        <View>
          <View style={styles.buttonView}>
          <Entypo name="home" size={24} color="black" /> 
            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('home')}
            >
              <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonView}>
          <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('profile')}
            >
              <Text style={styles.buttonText}>My Profile</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonView}>
          <MaterialCommunityIcons name="alarm-light" size={24} color="black" />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('LoudEmergencyConfig')}
            >
              <Text style={styles.buttonText}>Loud Emergency Config</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonView}>
          <MaterialCommunityIcons name="alarm-light-outline" size={24} color="black" />
            <TouchableOpacity 
              style={styles.button}
              onPress={() => props.navigation.navigate('SilentEmergencyConfig')}
            >
              <Text style={styles.buttonText}>Silent Emergency Config</Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View style={styles.buttonView}>
        <Feather name="log-out" size={24} color="black" />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => signOut(auth)}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    height: ScreenHeight-60,
    // backgroundColor: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    marginTop:10,
    marginLeft:10,
    padding:10,
    width:'86%'
    
  },
  buttonView:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    padding:5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CustomDrawerContent;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => props.navigation.navigate('home')}
        >
          <Text style={styles.buttonText}>Go Home</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={styles.button}
          onPress={() => props.navigation.navigate('About')}
        >
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => props.navigation.navigate('LoudEmergencyConfig')}
        >
          <Text style={styles.buttonText}>Loud Emergency Config</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => props.navigation.navigate('SilentEmergencyConfig')}
        >
          <Text style={styles.buttonText}>Silent Emergency Config</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    marginTop:10,
    padding:10
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default CustomDrawerContent;
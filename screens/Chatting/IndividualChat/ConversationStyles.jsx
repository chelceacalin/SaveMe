import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const styles = StyleSheet.create({
    colorWhite:{
      color:'white',
      fontWeight:"bold"
    },
  
    container: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor:'#1B394F'
    },
    messageContainer: {
      padding: 10,
      marginVertical: 5,
      color: 'white',
      borderRadius: 10,
    },
    senderMessage: {
      alignSelf: 'flex-end',
      backgroundColor: 'blue',
      color: 'white',
      margin:4
    },
    receiverMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#75118E',
      color: 'white',
      margin:4
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor:"#8A8C8C"
    },
    textinput: {
      flex: 1,
      backgroundColor: 'gray',
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
      borderRadius: 10,
      height: 45,
      padding: 5,
      paddingLeft: 15,
      marginRight: 10,
    },
    btn:{
      backgroundColor:'#11438E',
      padding:10,
      color:'white',
      fontWeight:'bold',
      paddingLeft:15,
      paddingRight:15
    }
  });
  
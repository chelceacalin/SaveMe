import React, { useState, useEffect, useRef } from "react";
import uuid from "react-native-uuid";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native";
import { db } from "../../../config/firebase";
import { ref, set, onValue } from "@firebase/database";
import IndividualChatNavbar from "./IndividualChatNavbar";
import { Modal, Portal, Button, Provider } from "react-native-paper";
import { styles } from "./ConversationStyles";

export default function Conversation({ navigation, route,photoUrl }) {
  const { targetUserUid, currentUserId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const readData = () => {
    onValue(
      ref(db, `messages/${currentUserId}/${targetUserUid}`),
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messagesArray = Object.values(data);
          setMessages(messagesArray);
        }
      }
    );
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const sendMessage = () => {
    let message_id = uuid.v4();
    let timestamp = new Date().getTime();
    let body = {
      id: message_id,
      message: message,
      whoSentIt: currentUserId,
      toWhom: targetUserUid,
      timestamp: timestamp,
    };
    set(
      ref(db, `messages/${currentUserId}/${targetUserUid}/${message_id}`),
      body
    );
    set(
      ref(db, `messages/${targetUserUid}/${currentUserId}/${message_id}`),
      body
    );
    setMessage("");
    readData();
  };

  const openModal = (item) => {
    setSelectedMessage(item);
    showModal();
  };

  const closeModal = () => {
    hideModal();
    setSelectedMessage(null);
  };

  const deleteMessage = () => {
    if (selectedMessage) {
      const messageId = selectedMessage.id;

      set(
        ref(db, `messages/${currentUserId}/${targetUserUid}/${messageId}`),
        null
      );
      closeModal();

      set(
        ref(db, `messages/${currentUserId}/${targetUserUid}/${messageId}`),
        null
      );
      closeModal();
    }
  };

  const renderItem = ({ item }) => {
    const isSender = item.whoSentIt === currentUserId;
    return (
      <View
        style={[
          styles.messageContainer,
          isSender ? styles.senderMessage : styles.receiverMessage,
        ]}
      >
        <TouchableOpacity onPress={() => openModal(item)}>
          <Text style={{ color: "white" }}>{item.message}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Provider>
      <View style={styles.container}>
        <IndividualChatNavbar
          navigation={navigation}
          targetUserUid={targetUserUid}
          photoUrl={photoUrl}
        />
        <FlatList
          ref={flatListRef}
          data={messages.sort((a, b) => a.timestamp - b.timestamp)}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onContentSizeChange={() => scrollToBottom()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textinput}
            value={message}
            placeholder="Type a new message"
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.btn}>
            <Text style={styles.colorWhite}>Send</Text>
          </TouchableOpacity>
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={closeModal}
            contentContainerStyle={containerStyle}
          >
            <Text>{selectedMessage?.message}</Text>
            <Button style={{ marginTop: 30 }} onPress={deleteMessage}>
              Yes, Delete
            </Button>
            <Button style={{ marginTop: 10 }} onPress={closeModal}>
              Cancel
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
}

import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import firebase from 'firebase'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { auth, db } from '../Firebase'
import { TouchableOpacity } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Platform } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useLayoutEffect(() => {
    const unsub = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    return unsub
  }, [route])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'chat',
      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Avatar rounded source={{ uri: messages[0]?.data.photoURL }} />
          <Text style={{ marginLeft: 15, fontWeight: '700' }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <AntDesign name='arrowleft' size={24} color='blue' />
        </TouchableOpacity>
      ),
    })
  }, [navigation, messages])
  const sendMessage = () => {
    Keyboard.dismiss()

    db.collection('chats').doc(route.params.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayname: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
    setInput('')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.sender}>
                  <Avatar
                    rounded
                    size={30}
                    containerStyle={{
                      position: 'absolute',
                      bottom: -15,
                      right: -5,
                    }}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    rounded
                    size={30}
                    containerStyle={{
                      position: 'absolute',
                      bottom: -15,
                      left: -5,
                    }}
                    source={{ uri: data.photoURL }}
                  />
                  <Text style={styles.receiverText}>{data.message}</Text>
                  <Text style={styles.receiverName}>{data.displayname}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              placeholder='send message'
              onChangeText={(text) => setInput(text)}
              style={styles.inputField}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name='send' size={24} color='blue' />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sender: {
    maxWidth: '80%',
    alignSelf: 'flex-end',
    padding: 15,
    marginRight: 15,
    marginBottom: 20,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    position: 'relative',
  },
  receiver: {
    maxWidth: '80%',
    alignSelf: 'flex-start',
    padding: 15,
    marginLeft: 15,
    marginBottom: 20,
    backgroundColor: 'blue',
    borderRadius: 20,
    position: 'relative',
  },
  receiverText: {
    color: 'white',
    fontWeight: '500',
    marginLeft: 5,
  },
  senderText: {
    color: 'black',
    fontWeight: '500',
    marginRight: 5,
  },
  receiverName: {
    color: 'black',
    fontSize: 14,
    position: 'absolute',
    bottom: -15,
    fontWeight: '400',
    left: 25,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  inputField: {
    bottom: 0,
    height: 40,
    flex: 1,
    backgroundColor: 'lightcyan',
    color: 'blue',
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
})

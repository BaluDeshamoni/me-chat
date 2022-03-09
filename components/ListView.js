import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from '../Firebase'

const ListView = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([])

  useEffect(() => {
    const unsub = db
      .collection('chats')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      )
    return unsub
  })

  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages[0]?.photoURL,
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle style={{ color: 'grey' }}>
          {chatMessages[0]?.displayname} : {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default ListView

const styles = StyleSheet.create({})

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import ListView from '../components/ListView'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Avatar } from 'react-native-elements'
import { auth, db } from '../Firebase'
import { SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native'

const HomeScreen = ({ navigation }) => {
  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('login')
      })
      .catch((error) => alert(error.message))
  }
  const [chats, setChats] = useState([])

  useEffect(() => {
    const unsub = db.collection('chats').onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
    return unsub
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            width: 60,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('chatroom')}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name='pencil' size={24} color='black' />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  const enterChatRoom = (id, chatName) => {
    navigation.navigate('chat', {
      id,
      chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <ListView
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChatRoom}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})

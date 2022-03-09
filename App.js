import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import HomeScreen from './Screens/HomeScreen'
import AddChatRoom from './Screens/AddChatRoom'
import ChatScreen from './Screens/ChatScreen'

import { View } from 'react-native'
import { Platform } from 'react-native'

const Stack = createStackNavigator()
export default function App() {
  return (
    <View style={Platform.OS === 'web' && styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='login' component={LoginScreen} />
          <Stack.Screen name='register' component={RegisterScreen} />
          <Stack.Screen name='home' component={HomeScreen} />
          <Stack.Screen name='chatroom' component={AddChatRoom} />
          <Stack.Screen name='chat' component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50vh',
    height: '90vh',
    alignSelf: 'center',
    marginVertical: '30px',
  },
})

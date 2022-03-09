import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { Input, Button, Image } from 'react-native-elements'
import { auth } from '../Firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('home')
      }
      console.log(authUser)
    })

    return unsub
  }, [])

  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    setEmail('')
    setPassword('')
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputcontainer}>
        <Input
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          type='Email'
        />
        <Input
          placeholder='Password'
          value={password}
          onSubmitEditing={login}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          type='password'
        />
      </View>
      <Button title='Login' onPress={login} containerStyle={styles.Button} />
      <Button
        title='Register'
        type='outline'
        onPress={() => navigation.navigate('register')}
        containerStyle={styles.Button}
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  inputcontainer: {},
  Button: {},
})

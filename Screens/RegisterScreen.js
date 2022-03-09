import React, { useState } from 'react'
import { KeyboardAvoidingView, View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../Firebase'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatar, setAvatar] = useState('')

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
          photoURL: avatar,
        })
      })
      .catch((error) => alert(error.message))
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputcontainer}>
        <Input
          placeholder='Username'
          value={username}
          onChangeText={(text) => setUsername(text)}
          type='username'
        />
        <Input
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          type='email'
        />
        <Input
          placeholder='Password'
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          type='password'
        />
        <Input
          placeholder='Avatar-Drop link here'
          value={avatar}
          onChangeText={(text) => setAvatar(text)}
          onSubmitEditing={register}
          type='avatar'
        />
      </View>
      <Button
        title='Register'
        onPress={register}
        containerStyle={styles.Button}
      />
      <View style={{ height: 100 }}></View>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {},
  inputcontainer: {},
  button: {},
})

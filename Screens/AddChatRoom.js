import React, {  useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input ,Button} from 'react-native-elements'
import { db } from '../Firebase'

const AddChatRoom = ({navigation}) => {
    const [chatName,setChatName]=useState('')

    const addChat=async()=>{
        await db.collection("chats").add({
            chatName:chatName,
        }).then(()=>navigation.goBack())
        .catch(error=>alert(error))
    }

    return (
        <View>
            <Input 
            placeholder="Enter chat name"
            type="text"
            value={chatName}
            onChangeText={text=>setChatName(text)}
            />
            <Button 
            onPress={addChat}
            title="Add"/>
        </View>

    )
}

export default AddChatRoom

const styles = StyleSheet.create({})

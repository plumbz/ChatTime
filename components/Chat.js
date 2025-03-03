import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params; //handle the props
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }
    // Render the messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);
    // update the Title with the entered name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {/* Feed GiftedChat with messages */}
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
                }}
            />
            {/* Adjust keyboard according to OS being used */}
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : <KeyboardAvoidingView behavior="padding" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Chat;
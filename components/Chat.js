import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, route, navigation, isConnected }) => {
    const { userID, name, backgroundColor } = route.params; //handle the props
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    let unsubMessages;

    // Render the messages
    useEffect(() => {
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when
            // useEffect code is re-executed.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];

                documentsSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cacheMessages(newMessages);
                setMessages(newMessages);
            })
        } else loadCachedMessages();

        // Cleanup the listener when the component unmounts
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }
    // update the Title with the entered name
    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            {/* Feed GiftedChat with messages */}
            <GiftedChat
                messages={messages}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
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
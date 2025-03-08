import { GiftedChat } from "react-native-gifted-chat";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    const { userID, name, backgroundColor } = route.params; //handle the props
    const [messages, setMessages] = useState([]);
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }
    // Render the messages
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];

            documentsSnapshot.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            })
            setMessages(newMessages);
        })

        // Cleanup the listener when the component unmounts
        return () => {
            if (unsubMessages) unsubMessages();
        };
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
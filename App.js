import { StyleSheet, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from "react";

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

const App = () => {
  // Your web app's Firebase configuration
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!")
      disableNetwork(db)
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);
  const firebaseConfig = {
    apiKey: "AIzaSyAWMhu2mKK-mPFoa-s_m6uXKlPV00GqtRg",
    authDomain: "chattime-30817.firebaseapp.com",
    projectId: "chattime-30817",
    storageBucket: "chattime-30817.firebasestorage.app",
    messagingSenderId: "543340592709",
    appId: "1:543340592709:web:c0398d482f3708b020ad2c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {props => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
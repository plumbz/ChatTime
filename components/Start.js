import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, SafeAreaView, Platform } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require('../assets/Background.png');
// Array of colors for the circles (your specified color options)
const circleColors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

const Start = ({ navigation }) => {
    const auth = getAuth();
    const signInUser = (name) => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { userID: result.user.uid, name: name, backgroundColor: circleColors[selectedCircle] });
                Alert.alert("Signed in Successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try later again.");
            })
    }
    const [name, setName] = useState('');
    const [selectedCircle, setSelectedCircle] = useState(null); //Track the selected circle

    const handlePress = (index) => {
        setSelectedCircle(index); // // Set the selected circle index
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Text style={styles.titleText}>Chat Time!</Text>
                {/* Container with white background. Every elements are wrapped 
                    inside seperate containers for better responsive behavior*/}
                <KeyboardAvoidingView style={styles.innerContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your name'
                            placeholderTextColor="rgba(117, 112, 131, 0.5)" // Placeholder color with 50% opacity
                        />
                    </View>
                    {/* Row of circles */}
                    <View style={styles.circleContainer}>
                        <Text style={styles.colorText}>Choose Background Color</Text>
                        <View style={styles.circleButtonContainer}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.circle, { backgroundColor: circleColors[index], marginLeft: index === 0 ? 0 : 20 }, // Apply circle color
                                    selectedCircle === index && styles.selectedCircle, // Highlight the selected circle
                                    ]}
                                    onPress={() => handlePress(index)} // Pass the circle index (1-based)
                                >

                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* Use TouchableOpacity with custom text style */}
                        <TouchableOpacity
                            style={styles.customButton} // Custom button style
                            onPress={() => signInUser(name)} // Pass the selected color
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center', // Centering the content inside ImageBackground
        width: '100%', // Ensures the background image covers the entire screen
    },
    innerContainer: {
        height: '44%', // Set the inner container to 44% of the screen height
        width: '88%',  // Optionally set width to something like 90% of the container's width
        justifyContent: 'center', // Vertically center the content inside the inner container
        alignItems: 'center',  // Horizontally center the content
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional background with slight transparency
    },
    inputContainer: {
        flex: 3,
        width: "88%",
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        fontSize: 16, // Font size for the input text
        color: "#757083", // Text color for input text
        fontWeight: 300,
    },
    circleContainer: {
        flex: 5,
        width: "88%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
        marginBottom: 20,
    },
    circleButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    circle: {
        width: 50, // Width of each circle
        height: 50, // Height of each circle
        backgroundColor: 'skyblue', // Circle color
        borderRadius: 25, // Make it a circle (half of width/height)
        justifyContent: 'center', // Center text inside the circle
        alignItems: 'center', // Center text inside the circle
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedCircle: {
        borderColor: '#757083', // Change the border color when selected
        borderWidth: 3, // Increase border width when selected

    },
    buttonContainer: {
        flex: 3,
        width: '88%', // Make the button container 88% of the inner container's width
    },
    customButton: {
        backgroundColor: '#757083', // Button background color
        paddingVertical: 12, // Padding for vertical size
        paddingHorizontal: 32, // Padding for horizontal size
        borderRadius: 5, // Optional border radius for rounded corners
        alignItems: 'center', // Center the text horizontally
        justifyContent: 'center', // Center the text vertically
        height: 60,
    },
    buttonText: {
        fontSize: 16, // Font size
        fontWeight: '600', // Font weight
        color: '#FFFFFF', // Font color
    },
    titleText: {
        color: 'white',
        fontSize: 45,
        fontWeight: 600,
        height: "40%"
    },

});

export default Start;
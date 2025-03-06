import { useState } from 'react';
import { ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const image = require('../assets/Background.png');
// Array of colors for the circles (your specified color options)
const circleColors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

const Start = ({ navigation }) => {
    const auth = getAuth();
    const signInUser = (name) => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate('Chat', { name: name, backgroundColor: circleColors[selectedCircle] });
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
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Chat Time!</Text>
                </View>
                {/* Container with white background. Every elements are wrapped 
                    inside seperate containers for better responsive behavior*/}
                <View style={styles.innerContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Your name'
                        placeholderTextColor="rgba(117, 112, 131, 0.5)" // Placeholder color with 50% opacity
                    />
                    {/* Row of circles */}
                    <Text style={styles.colorText}>Choose Background Color</Text>
                    <View style={styles.circleContainer}>
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
                    <View style={styles.buttonContainer}>
                        {/* Use TouchableOpacity with custom text style */}
                        <TouchableOpacity
                            style={styles.customButton} // Custom button style
                            onPress={() => signInUser(name)} // Pass the selected color
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
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
        justifyContent: 'center',
        alignItems: 'center', // Centering the content inside ImageBackground
        width: '100%', // Ensures the background image covers the entire screen
    },
    textInput: {
        width: "88%",
        padding: 20,
        borderWidth: 1,
        marginBottom: 20,
        fontSize: 16, // Font size for the input text
        color: "#757083", // Text color for input text
        fontWeight: 300,
        marginTop: 0,
        height: 60,

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
    buttonContainer: {
        width: '88%', // Make the button container 88% of the inner container's width
        marginTop: 20, // Optional margin for spacing
        height: 60,

    },
    circleContainer: {
        flexDirection: 'row',  // Align the circles horizontally
        justifyContent: 'center',  // Center the circles horizontally
        marginBottom: 50, // Add some spacing between the circles and the button
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
    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
        marginBottom: 20,
    },
    titleText: {
        color: 'white',
        fontSize: 45,
        fontWeight: 600,
    },
    title: {
        marginBottom: 280,  // Add space below the title
        marginTop: 100, // Move the title further up by increasing marginTop
    },
    innerContainer: {
        height: '44%', // Set the inner container to 44% of the screen height
        width: '88%',  // Optionally set width to something like 90% of the container's width
        justifyContent: 'top', // Vertically center the content inside the inner container
        alignItems: 'center',  // Horizontally center the content
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional background with slight transparency
        paddingTop: 15,
        marginBottom: 0,
        padding: 0,

    },
});

export default Start;
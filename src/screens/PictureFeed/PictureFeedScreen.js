

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    const handleTakePicturePress = () => {
        if (camera) {
            camera.takePictureAsync(null)
                .then((response) => {
                    console.log(response.uri)
                    setImage(response.uri)
                    console.log(image)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }



    return (
        <View style={styles.cameraContainer}>
            <Camera style={styles.fixedRatio} type={type} ratio={'1:1'} ref={ref => setCamera(ref)}>
                <View style={styles.cameraContainer}>
                </View>
            </Camera>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}>
                    <Text style={styles.text}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePicturePress}>

                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
            </View>
            {image && <Image source={{ uri: image }} style={styles.cameraContainer} />}
        </View >
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection: 'column',

    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    },
    button: {

        height: 47,

        backgroundColor: '#788eec',
        width: '100%',
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    // buttonContainer: {
    //     display: 'flex',
    //     flexDirection: 'row'
    // }
});
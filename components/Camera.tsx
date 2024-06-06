import React, { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Camera = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Precisamos da sua permissão para mostrar a câmera</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Liberar</Text>
                </TouchableOpacity>
            </View>
        );
    } 

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <CameraView style={styles.camera} facing={facing}>
            <View style={styles.cameraButtonContainer}>
                <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraFacing}>
                    <Text style={styles.flipCameraButtonText}>^</Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        color: '#ff6a06'
    },
    text: {
        textAlign: 'center',
        marginBottom: 20,
    },
    camera: {
        flex: 1,
    },
    cameraButtonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    flipCameraButton: {
        backgroundColor: '#ff6a06',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    flipCameraButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
   button: {
        backgroundColor: '#ff6a06',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Camera;

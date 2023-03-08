import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker'


export default function ImagePicker() {

    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()


    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!', 'You need to grant camera permissions to use this app')
            return false
        }
        return true
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,

        });
        setPickedImage(image.uri);
    }

    let imagePreview = <Text>No image take yet</Text>
    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <Button title='Take image' onPress={takeImageHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
})
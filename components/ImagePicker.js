import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA)// ask permission to use camera /Permissions.CAMERA_ROLL permission to use gallery
        if (result.status !== 'granted') {
            Alert.alert('Permision denied!', 'You nedd to grant camera permission to use this app', [{ text: 'OKAY' }])
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const imageTaken = await ImagePicker.launchCameraAsync({
            allowsEditing: true, // get a basic editor which allows you to crop the image for example
            aspect: [16, 9], // aspect ratio where you want to login .Like 16:9 will be takem into account in your editing mode
            quality: 0.5// quality range between 0 and 1 , this impact the image size 
        });
        console.log("imageTaken", imageTaken)
        setPickedImage(imageTaken.uri);
        props.onImageTaken(imageTaken.uri);

    }
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? <Text>No image picked yet.</Text> :
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                }
            </View>
            <View style={styles.takeImgBtnWrapper}>
                <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    takeImgBtnWrapper: {
        paddingBottom: 10
    }
})

export default ImgPicker;
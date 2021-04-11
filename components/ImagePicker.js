import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/Colors';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImgPicker = props => {

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL)// ask permission to use camera /Permissions.CAMERA_ROLL permission to use gallery
        if(result.status !== 'granted'){
            Alert.alert('Permision denied!','You nedd to grant camera permission to use this app',[{text:'OKAY'}])
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        ImagePicker.launchCameraAsync();
    }
    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                <Text>No image picked yet.</Text>
                <Image style={styles.image} />
            </View>
            <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
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
})

export default ImgPicker;
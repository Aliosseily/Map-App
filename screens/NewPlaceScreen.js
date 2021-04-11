
import React, { useState } from 'react';
import { ScrollView, View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/actions/Places';
import ImagePicker from '../components/ImagePicker'


const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();
    const dispatch = useDispatch();

    const titleChangeHandler = text => {
        setTitleValue(text)
    }
    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(titleValue,selectedImage));
        props.navigation.goBack(); // back to the previous page when done
    }

    const imageTakenHandler = imagePath =>{
        setSelectedImage(imagePath);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput placeholder="Add your place ..." style={styles.textInput} value={titleValue} onChangeText={titleChangeHandler} />
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
            </View>
        </ScrollView>
    )
}
NewPlaceScreen.navigationOptions = {
    headerTitle: "Add Place"
}
const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    },
})

export default NewPlaceScreen;
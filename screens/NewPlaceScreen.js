
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NewPlaceScreen = props => {
    return(
        <View>
            <Text>New Places screen</Text>
        </View>
    )
}
NewPlaceScreen.navigationOptions ={
    headerTitle:"Add Place"
}
const styles = StyleSheet.create({})

export default NewPlaceScreen;
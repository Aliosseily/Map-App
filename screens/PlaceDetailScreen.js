
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = props => {
    return (
        <View>
            <Text>Places detail screen</Text>
        </View>
    )
}

PlaceDetailScreen.navigationOption = navData => {
    return {
        headerTitle: navData.navigation.getParm('placeTitle')
    }
}

const styles = StyleSheet.create({})

export default PlaceDetailScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = props => {
    // Delta set the zoom value because this describes how much space around you can see around latitude and longitude
    const mapRegion = {
        latitude:37.78,
        longitude:-122.43,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
    }
    return (
        <MapView style={styles.map} region={mapRegion}/> /*region tells the map where it should be focused when it loads*/
    )
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})

export default MapScreen;
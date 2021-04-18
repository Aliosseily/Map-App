import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
    const [selectedLocation, setSelectedLocation] = useState();
    // Delta set the zoom value because this describes how much space around you can see around latitude and longitude
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const setLocationHandler = event => {
        console.log(event.nativeEvent)
        setSelectedLocation({
            lat:event.nativeEvent.coordinate.latitude,
            lng:event.nativeEvent.coordinate.longitude
        })
    }
    let markerCoordinates;
    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
        }
    }
    return (
        /*region tells the map where it should be focused when it loads*/
        <MapView style={styles.map} region={mapRegion} onPress={setLocationHandler} > 
            { markerCoordinates && <Marker title="Picked location" coordinate={markerCoordinates}></Marker>}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
})

export default MapScreen;
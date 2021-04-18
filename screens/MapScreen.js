import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';
const MapScreen = props => {
    const initialLocation = props.navigation.getParam('initialLocation');
    const readonly = props.navigation.getParam('readonly');
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    // Delta set the zoom value because this describes how much space around you can see around latitude and longitude
    const mapRegion = {
        latitude:initialLocation ? initialLocation.lat : 37.78,
        longitude: initialLocation ? initialLocation.lng : -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const setLocationHandler = event => {
        if (readonly) {
            return;
        }
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            return;
        }
        props.navigation.navigate("NewPlace", { pickedLoaction: selectedLocation });
    }, [selectedLocation]);

    useEffect(() => {
        props.navigation.setParams({ saveLocation: savePickedLocationHandler })
    }, [savePickedLocationHandler])

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

MapScreen.navigationOptions = navData => {
    const saveFn = navData.navigation.getParam('saveLocation')
    const readonly = navData.navigation.getParam('readonly');
    if (readonly) {
        return {};
    }
    return {
        headerRight: () =>
            <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
                <Text style={styles.headerButtontext}>Save</Text>
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerButtontext: {
        fontSize: 16,
        color: Platform.OS === 'android' ? "white" : Colors.primary
    }
})

export default MapScreen;
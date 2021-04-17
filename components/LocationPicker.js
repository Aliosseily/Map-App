import React, { useState, useEffect } from 'react';
import { Text, View, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const verifyPermissions = async () => {

    const result = await Permissions.askAsync(Permissions.LOCATION)// ask permission to use location
    if (result.status !== 'granted') {
        Alert.alert('Permision denied!', 'You nedd to grant location permission to use this app', [{ text: 'OKAY' }])
        return false;
    }
    return true;
}

const LocationPicker = props => {
    const [pickedLocation, setPickedLocation] =useState();
    const [isFetching, setIsFetching] =useState();
    const getrLocationHandler = async () => {
      const hasPermission = await verifyPermissions(false);
      if(!hasPermission){
          return;
      }
      try{
        setIsFetching(true);
          const location = await Location.getCurrentPositionAsync({timeout : 5000});
          console.log(location)
          setPickedLocation({
              lat:location.coords.latitude,
              lng:location.coords.longitude,
          });
      }catch(err){
          Alert.alert('Could not fetch location', 'Please try again later or pick a location on the map.',[{text:"OKAY"}])
      }
      setIsFetching(false);

    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching ? <ActivityIndicator size="large" color={Colors.primary} />: 
                <Text>No location choosen yet!</Text>}
            </View>
            <Button title="Get user location" color={Colors.primary} onPress={getrLocationHandler} />
        </View>
    )
}
const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center'
    },

})
export default LocationPicker;
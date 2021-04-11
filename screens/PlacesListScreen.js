import React from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from '../components/UI/HeaderButton';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';



const PlacesListScreen = props => {
    const places = useSelector(state => state.places.places) // in App.js rootReducer I define places .places inside initilState defined in places.js reducer  
    console.log("places", places)
    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => <PlaceItem
                onSelect={() => {
                    props.navigaion.navigate('PlaceDetail', {
                        //send params to PlaceDetailScreen
                        placeTitle: itemData.item.title,
                        placeId: itemData.item.id
                    });
                }}
                image={null}
                title={itemData.item.title}
                address={null}
            />}
        />
    )
}

PlacesListScreen.navigationOptions = navData => {

    return {
        headerTitle: "All Places",
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add Place'
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => {
                    navData.navigation.navigate('NewPlace')
                }}
            />
        </HeaderButtons>
    }
}





const styles = StyleSheet.create({})

export default PlacesListScreen;
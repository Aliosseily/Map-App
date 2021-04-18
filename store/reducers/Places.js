import { ADD_PLACE, GET_PLACES } from '../actions/Places';
import Place from '../../models/place'

const initilState = {
    places: []
}

export default (state = initilState, action) => {
    switch (action.type) {
        case GET_PLACES:
            return {
                // map this array into a new array to transform every single place into a place that follows my place model
                places: action.allPlaces.map(
                    pl => new Place(pl.id.toString(), pl.title, pl.imageUri, pl.address, pl.lat, pl.lng)
                )
            }
        case ADD_PLACE:
            console.log("run");
            const newPlace = new Place(
                // new Date().toString(), // dummy unique id
                action.placeData.id.toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng,
            )
            return {
                //...state, I don't need to copy the old state because I have nothing else in my state here and I won't add every thing 
                places: state.places.concat(newPlace)
            };


        default:
            return state;
    }

}
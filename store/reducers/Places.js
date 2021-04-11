import { ADD_PLACE } from '../actions/Places';
import Place from '../../models/place'

const initilState = {
    places: []
}

export default (state = initilState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            console.log("run");
            const newPlace = new Place(
                new Date().toString(), // dummy unique id
                action.placeData.title
            )
            console.log("initilState", initilState)
            console.log("newPlace", newPlace)
            return {
                //...state, I don't need to copy the old state because I have nothing else in my state here and I won't add every thing 
                places: state.places.concat(newPlace)
            };
        default:
            return state;
    }
}
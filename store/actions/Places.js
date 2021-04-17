
import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';
import { insertPlace, fetchPlaces } from '../../helpers/db'
/* like sending HTTP request Now moving a file is basically the same category of thing we're doing, 
instead of sending a request to a server, we're moving a file, well it's not that different.*/
export const addPlace = (title, image) => {
    return async dispatch => { // using Thunk
        /* You got the cache directory which is actually the directory where the file is already stored in out
        of the box, the bundle directory which is not really a good directory for storing files your app uses
        either but you also got the document directory,
        this is the main directory for any files that your app needs which are guaranteed to survive.
        Now when you uninstall your app, this folder will also be erased,
        so then these files are lost but until then, they will persist across app restarts, across long pauses
        where people haven't used your app,
        so here the files will survive.
        So the filesystem document directory is the path I want to move my file to and now there's one important
        thing to know, your path also needs to include the file name you want to use in the future.
        Of course, you also get a temporary file name when you take the image but when you move a file, this name
        is actually not kept out of the box, instead it will assume this path here as a name so to say. So therefore
        this should not just be a pointer at the folder you want to move the file to,
        it should instead also include the file name.*/

        // someFolder/myimage.jpg => ['someFolder','myimage.jpg'] => myimage.jpg
        const fileName = image.split('/').pop(); // this will return our file name 
        const newPath = FileSystem.documentDirectory + fileName;
        //this method moves a file from a to b
        //image is the path of the temporary directory
        //newPath our new path
        // this will store our image in in a permenant directory
        try {
            FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(title, newPath, "Dummy Address", 15.6, 12.3);
            console.log(dbResult);
            // dispatch({ type: ADD_PLACE, placeData: { title: title, image: image } })
            dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath } })
        }
        catch (err) {
            console.log(err);
            throw err;
        }


    }
}

export const getAllPlaces = () => {
    return async dispatch => {
        try{
            const dbAllPlacesResult = await fetchPlaces();
            dispatch({ type: GET_PLACES, allPlaces: dbAllPlacesResult.rows._array })
        }
        catch(err){
            throw err;
        }

    }
}
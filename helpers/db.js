import * as SQLite from 'expo-sqlite';


// this will connect to database or create the database if it can't find it when we first launched the app. places.db' is database name
const db = SQLite.openDatabase('places.db');

export const init = () => {
    // transactionis a concept where this package guarantees that your query is always as whole and if some part of the query fail, the entier query is rolled back so you can't end up with corrupted data in your database
    //PRIMARY KEY => will alse auto generate id, REAL => float number
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)',
                [],
                () => {
                    resolve()
                },
                (_, err) => {
                    reject(err);
                }
            )
        })
    })
    return promise;

}
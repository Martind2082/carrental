import React from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from "react";
import { useState } from "react";

export const firebasecontext = React.createContext();

const FirebaseContext = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
        return unsub;
    })
    // function createaccount() {
    //     createUserWithEmailAndPassword()
    // }
    // function signin() {

    // }
    // function signout() {
    //     signOut(auth);
    // }
    return (
        <firebasecontext.Provider value={{user}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
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
    function createaccount(email, password, e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .catch(() => {
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = 'Password should be at least 6 characters in length';
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 3500);
            });
    }
    function login(email, password, e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => console.log(err))
    }
    function signout() {
        signOut(auth);
    }
    return (
        <firebasecontext.Provider value={{user, createaccount, login, signout}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
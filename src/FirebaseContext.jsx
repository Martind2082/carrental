import React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

export const firebasecontext = React.createContext();

const FirebaseContext = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const colRef = collection(db, "names");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })
        return unsub;
    })
    function createaccount(name, email, password, e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                addDoc(colRef, {
                    email: email,
                    name: name
                })
            })
            .catch(err => {
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = err.toString();
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 3500);
            });
    }
    function login(email, password, e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = err.toString();
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 3500);
            })
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
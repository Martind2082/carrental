import React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

export const firebasecontext = React.createContext();

const FirebaseContext = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [logingoogle, setlogingoogle] = useState(0);
    const [user, setUser] = useState();
    const colRef = collection(db, "names");
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
            if (logingoogle === 1) {
                setlogingoogle(2);
                addDoc(colRef, {
                    email: user.email,
                    name: user.displayName
                })
            }
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
        signOut(auth)
    }
    function signinwithgoogle() {
        let provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(() => setlogingoogle(1))
    }
    return (
        <firebasecontext.Provider value={{user, createaccount, login, signout, signinwithgoogle}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
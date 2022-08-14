import React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

export const firebasecontext = React.createContext();

const FirebaseContext = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    const [signedinuser, setsignedinuser] = useState();
    const [uid, setUid] = useState();

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
        signOut(auth)
    }
    function signinwithgoogle() {
        let provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "names"), snapshot => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                if (snapshot.docs[i].data().email === user.email) {
                    setUid(snapshot.docs[i].id);
                    setsignedinuser(snapshot.docs[i].data().name);
                    return;
                }
            }
            addDoc(collection(db, 'names'), {
                email: user.email,
                name: user.displayName
            })
            for (let i = 0; i < snapshot.docs.length; i++) {
                if (snapshot.docs[i].data().email === user.email) {
                    setUid(snapshot.docs[i].id);
                    setsignedinuser(snapshot.docs[i].data().name);
                    return;
                }
            }
        })
        return unsub;
    }, [user])
    return (
        <firebasecontext.Provider value={{user, createaccount, login, signout, signinwithgoogle, signedinuser, setsignedinuser, uid, setUid}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
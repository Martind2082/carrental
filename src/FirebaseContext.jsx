import React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from "react";
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import list from './cars.json';

export const firebasecontext = React.createContext();

const FirebaseContext = ({children, setcartitems, cartitems}) => {
    const {carslist} = list;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [purchasehistory, setpurchasehistory] = useState('');
    const [signedinuser, setsignedinuser] = useState();
    const [uid, setUid] = useState();
    const [loginerror, setloginerror] = useState('');

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
                    name: name,
                    purchasehistory: "",
                    garageitems: ""
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
            .then(() => {
                setloginerror('');
            })
            .catch(err => {
                if ((err.toString().split(' ').slice(-1).join('') === '(auth/invalid-email).')) {
                    setloginerror('Invalid Email');
                    return;
                }
                if (err.toString().split(' ').slice(-1).join('') === '(auth/user-not-found).') {
                    setloginerror('User not Found');
                    return;
                }
                if (err.toString().split(' ').slice(-1).join('') === '(auth/wrong-password).') {
                    setloginerror('Incorrect Password');
                    return;
                }
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
        signInWithPopup(auth, provider).then(() => {
            setloginerror('');
        })
    }
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "names"), snapshot => {
            if (user) {
                for (let i = 0; i < snapshot.docs.length; i++) {
                    if (snapshot.docs[i].data().email === user.email) {
                        setUid(snapshot.docs[i].id);
                        setsignedinuser(snapshot.docs[i].data().name);
                        if (snapshot.docs[i].data().purchasehistory.length !== 0) {
                            setpurchasehistory(snapshot.docs[i].data().purchasehistory);
                        }
                        if (snapshot.docs[i].data().garageitems.length !== 0) {
                            let cartitems = snapshot.docs[i].data().garageitems.split(',').map(num => carslist[num]); 
                            setcartitems(cartitems);
                        }
                        return;
                    }
                }
                addDoc(collection(db, 'names'), {
                    email: user.email,
                    name: user.displayName,
                    purchasehistory: "",
                    garageitems: ""
                })
                for (let i = 0; i < snapshot.docs.length; i++) {
                    if (snapshot.docs[i].data().email === user.email) {
                        setUid(snapshot.docs[i].id);
                        setsignedinuser(snapshot.docs[i].data().name);
                        if (snapshot.docs[i].data().purchasehistory) {
                            setpurchasehistory(snapshot.docs[i].data().purchasehistory);
                        }
                        if (snapshot.docs[i].data().garageitems.length !== 0) {
                            let cartitems = snapshot.docs[i].data().garageitems.map(num => carslist[num]); 
                            setcartitems(cartitems);
                        }
                        return;
                    }
                }   
            }
        })
        return unsub;
    }, [user])
    useEffect(() => {
        if (!user) {
            return;
        }
        if (cartitems.length !== 0) {
            let cartids = cartitems.map(obj => obj.id);
            cartids = cartids.join(',');
            updateDoc(doc(db, 'names', uid), {
                garageitems: cartids
            })
        }
    }, [cartitems])
    return (
        <firebasecontext.Provider value={{user, createaccount, login, signout, signinwithgoogle, signedinuser, setsignedinuser, uid, setUid, purchasehistory, setpurchasehistory, loginerror}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
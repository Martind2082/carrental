import React from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, updateEmail, updatePassword } from 'firebase/auth';
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
    const [signuperror, setsignuperror] = useState('');
    const [resetpass, setresetpass] = useState('');
    const [newuserbyupdateprofile, setnewuserbyupdateprofile] = useState(false);


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
                if (err.toString().split(' ').slice(-1).join('') === '(auth/invalid-email).') {
                    setsignuperror('Invalid Email');
                    return;
                }
                if (err.toString().split(' ').slice(-1).join('') === '(auth/weak-password).') {
                    setsignuperror('Password must be at least 6 characters');
                    return;
                }
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = err.toString();
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 10000);
            });
    }
    function login(email, password, e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .catch(err => {
                console.log(err);
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
                }, 10000);
            })
    }
    function signout() {
        signOut(auth)
            .then(() => setcartitems([]))
    }
    function signinwithgoogle() {
        let provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "names"), snapshot => {
            if (user && newuserbyupdateprofile === false) {
                for (let i = 0; i < snapshot.docs.length; i++) {
                    if (snapshot.docs[i].data().email === user.email) {
                        setUid(snapshot.docs[i].id);
                        setsignedinuser(snapshot.docs[i].data().name);
                        if (snapshot.docs[i].data().purchasehistory.length !== 0) {
                            setpurchasehistory(snapshot.docs[i].data().purchasehistory);
                        } else {
                            setpurchasehistory('');
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
    }, [uid])

    useEffect(() => {
        if (user) {
            setloginerror('');
            setsignuperror('');
            setresetpass('');
        }
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
    function resetpassword(email, e) {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                document.getElementById('forgotpassemail').textContent = `Check your inbox at ${email} to reset your password`;
                document.getElementById('forgotpassemail').style.border = 'none';
                document.getElementById('forgotpassemail').style.fontWeight = 'bold';
                document.getElementById('forgotpassemail').style.fontSize = '1.2rem';
            })
            .catch(err => {
                if ((err.toString().split(' ').slice(-1).join('') === '(auth/invalid-email).')) {
                    setresetpass('Invalid Email');
                    return;
                }
                if ((err.toString().split(' ').slice(-1).join('') === '(auth/user-not-found).')) {
                    setresetpass('User not found');
                    return;
                }
            });
    } 
    function updateemail(newemail, oldpassword, e) {
        setnewuserbyupdateprofile(true)
        signInWithEmailAndPassword(auth, user.email, oldpassword)
            .then(() => {
                setloginerror('');
                setnewuserbyupdateprofile(false);
                updateEmail(auth.currentUser, newemail).then(() => {
                    updateDoc(doc(db, 'names', uid), {
                        email: newemail
                    })
                })
            })       
            .catch((err) => {
                if (err.toString() === "FirebaseError: Firebase: Error (auth/requires-recent-login).") {
                    updateemail(newemail, oldpassword, e);
                    return;
                }
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = err.toString();
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 5000);
                return; 
            })
    }
    function updatepassword(newpassword, oldpassword, e) {
        setnewuserbyupdateprofile(true);
        login(user.email, oldpassword, e)
        setloginerror('');
        updatePassword(user, newpassword)
            .then(() => setnewuserbyupdateprofile(false))
            .catch((err) => {
                if (err.toString() === "FirebaseError: Firebase: Error (auth/requires-recent-login).") {
                    updatepassword(newpassword, oldpassword, e)
                    return;
                }
                let popup = document.createElement('div');
                popup.classList.add('popup');
                popup.textContent = err.toString();
                document.body.append(popup);
                setTimeout(() => {
                    popup.remove();
                }, 5000);
            })
    }
    return (
        <firebasecontext.Provider value={{setnewuserbyupdateprofile, user, resetpass, updateemail, updatepassword, setresetpass, createaccount, login, signout, signinwithgoogle, signedinuser, setsignedinuser, uid, setUid, purchasehistory, setpurchasehistory, loginerror, setloginerror, signuperror, setsignuperror, resetpassword}}>
            {!loading && children}
        </firebasecontext.Provider>
    );
}
 
export default FirebaseContext;
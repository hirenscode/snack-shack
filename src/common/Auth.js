import React, {useEffect, useState} from "react";
import firebase from "../firebase";
import {OUR_PLATE, PSEUDO_PLATE} from "./Utility";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            let isAdmin = false;
            firebase.firestore().collection("users_type").onSnapshot(snapshot => {
                const users = snapshot.docs.map(u => u.data());
                const checkUser = (users && users.length > 0 && user)  ? users.filter(u => u.uid === user.uid)[0] : undefined;
                isAdmin = checkUser ? checkUser.type === "admin" : false;
                if (user) {
                    setCurrentUser({...user, _cau: isAdmin ? OUR_PLATE : PSEUDO_PLATE});
                } else {
                    setCurrentUser(user);
                }
            });
        });
    }, []);

    return <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
}

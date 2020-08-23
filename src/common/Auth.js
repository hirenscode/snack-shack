import React, {useEffect, useState} from "react";
import firebase from "../firebase";
import {OUR_PLATE, PSEUDO_PLATE} from "./Plate";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            let plate = false;
            firebase.firestore().collection("users_type").onSnapshot(snapshot => {
                const users = snapshot.docs.map(u => u.data());
                const checkPlate = (users && users.length > 0 && user)  ? users.filter(u => u.uid === user.uid)[0] : undefined;
                plate = checkPlate ? checkPlate.type === "admin" : false;
                if (user) {
                    setCurrentUser({...user, _cau: plate ? OUR_PLATE : PSEUDO_PLATE});
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

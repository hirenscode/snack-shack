import React, {useContext, useState} from "react";
import {SETTINGS} from "../../common/Constants";
import firebase from "./../../firebase";
import {AuthContext} from "../../common/Auth";
import {checkUsersPlate} from "../../common/Plate";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const showAlertSuccessClass = "alert alert-success alert-dismissible fade show";
    const showAlertErrorClass = "alert alert-danger alert-dismissible fade show";
    const showAlertWarningClass = "alert alert-warning alert-dismissible fade show";
    const hideAlertClass = "alert collapse";

    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(hideAlertClass);

    const loginUser = (e) => {
        e.preventDefault();
        e.persist();

        if (email === "" || password === "") {
            setMessage("Please enter your credentials");
            setShowAlert(showAlertErrorClass);
            return;
        }

        console.log("Attempting login...");
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log("Login successful, checking admin status...");
                // Get the user from the credential
                const user = userCredential.user;
                
                // Check if user is admin by querying Firestore
                return firebase.firestore()
                    .collection("users_type")
                    .where("uid", "==", user.uid)
                    .get()
                    .then((snapshot) => {
                        const isAdmin = !snapshot.empty && snapshot.docs[0].data().type === "admin";
                        console.log("Admin check result:", isAdmin);
                        
                        if (!isAdmin) {
                            setMessage("You are not Authorized to access this functionality.");
                            setShowAlert(showAlertWarningClass);
                            // Sign out the user since they're not authorized
                            return firebase.auth().signOut();
                        } else {
                            setMessage("Login Successful");
                            setShowAlert(showAlertSuccessClass);
                            console.log("Navigating to admin dashboard...");
                            // Navigate to admin dashboard after successful login
                            navigate("/admin/", { replace: true });
                        }
                    });
            })
            .catch((err) => {
                setMessage("Login Failed, please check your credentials and try again");
                setShowAlert(showAlertErrorClass);
                console.error("Login error:", err);
            });
    }

    return <div className="text-center">
        <div className={showAlert} role="alert">
            {message}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form className="form-signin">
            <img className="mb-4" src={SETTINGS.APP.LOGO} alt="" width="72" height="72"/>
            <h1 className="h5 mb-3 font-weight-normal">Please sign in</h1>

            <div className="input-group mb-3">
                <input type="email"
                       id="email"
                       className="form-control"
                       placeholder="Email address"
                       required
                       autoFocus
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="input-group mb-3">
                <input type="password"
                       id="password"
                       className="form-control"
                       placeholder="Password"
                       required
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="checkbox mb-3">
                <input type="checkbox" value="remember-me"/> Remember me
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={loginUser}>Sign in</button>
        </form>
    </div>
}

export default Login;

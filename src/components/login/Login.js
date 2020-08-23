import React, {useContext, useState} from "react";
import {SETTINGS} from "../../common/Constants";
import firebase from "./../../firebase";
import {AuthContext} from "../../common/Auth";
import {checkUsersPlate} from "../../common/Utility";

const Login = () => {

    const showAlertSuccessClass = "alert alert-success alert-dismissible fade show";
    const showAlertErrorClass = "alert alert-danger alert-dismissible fade show";
    const showAlertWarningClass = "alert alert-warning alert-dismissible fade show";
    const hideAlertClass = "alert collapse";

    const currentUser = useContext(AuthContext);
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
            return ;
        }



        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                if (!checkUsersPlate(currentUser._cau)) {
                    setMessage("You are not Authorized to access this functionality.");
                    setShowAlert(showAlertWarningClass);
                } else {
                    setMessage("Login Successful");
                    setShowAlert(showAlertSuccessClass);
                }
            })
            .catch((err) => {
                setMessage("Login Failed, please check your credentials and try again");
                setShowAlert(showAlertErrorClass);
                console.error(err);
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

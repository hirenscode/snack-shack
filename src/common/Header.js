import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {SETTINGS} from "./Constants";
import firebase from "./../firebase";
import {AuthContext} from "./Auth";

function Header() {
    const object = useContext(AuthContext);


    return <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <img className="rounded mx-auto d-block logo-image" alt="logo" src={SETTINGS.APP.LOGO}/>
            <a className="navbar-brand" href="#"> {SETTINGS.APP.NAME} </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span> </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/track-orders">Track Order</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            {object && !!object.currentUser ? (<><Link className="dropdown-item" to="/admin/"> Chef's Home </Link>
                            <Link className="dropdown-item" to="/admin/orders"> Orders </Link>
                            <Link className="dropdown-item" to="/admin/add-new-menu"> Add New Menu </Link>
                            <Link className="dropdown-item" to="/admin/all-menu-items"> All Menu Items </Link>
                             <a className="dropdown-item" href="#" onClick={e => {
                                firebase.auth().signOut().then(() =>
                                    {console.log("Signed out successfully.");}
                                )
                            }}> Sign Out </a></>) : (<Link className="dropdown-item" to="/admin/"> Sign In </Link>)}
                        </div>
                        {/*<a className="nav-link" href="/admin/"> Admin </a>*/}
                    </li>
                </ul>
            </div>
        </nav>
    </header>;
}

export default Header;

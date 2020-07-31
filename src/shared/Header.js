import React from "react";
import {Link} from "react-router-dom";

function Header() {
    return <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a className="navbar-brand" href="#"> Snack Shack </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span> </Link>
                        {/*<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>*/}
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/track-orders">Track Order</Link>
                        {/*<a className="nav-link" href="/track-orders/">Track Order</a>*/}
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="/admin">Admin</Link>
                        {/*<a className="nav-link" href="/admin/"> Admin </a>*/}
                    </li>
                </ul>
            </div>
        </nav>
    </header>;
}

export default Header;

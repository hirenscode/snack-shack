import React from "react";
import {SETTINGS} from "./Constants";

function Footer() {
    return <footer className="container">
        <p className="float-right"><a href="#">Back to top</a></p>
        <p>© 2020 {SETTINGS.APP.NAME}. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
    </footer>;
}

export default Footer;

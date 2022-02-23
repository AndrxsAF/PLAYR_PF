import React from "react";
import PropTypes from "prop-types";

import { Navbar } from "./Navbar/Navbar.jsx";
import { Footer } from "./Footer/Footer.jsx";


const Layout = (props) => {

    return (
        <>
            <header>
                <Navbar />
            </header>
            <div>
                {props.children}
            </div>
            <footer>
                <Footer/>
            </footer>
        </>
    )
}

Layout.propTyps = {
    children: PropTypes.any
}

export default Layout
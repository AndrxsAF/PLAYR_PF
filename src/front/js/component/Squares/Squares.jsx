import React, { useEffect, useContext, useState } from "react";
import "./squares.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Pics

// Service 

// Component


const Squares = (props) => {

    return (
        <div className="bg-alert carousel-inner img-square-container">
            <img className="img-square" src={props.img} alt={props.img} />
            <div className="px-2 games-square carousel-caption d-none d-md-block">
                <h6>{`${props.game} / ${props.console}`}</h6>
            </div>
        </div>
    )

}

Squares.propTypes = {
    img: PropTypes.string,
    game: PropTypes.string,
    console: PropTypes.string
}

export default Squares;
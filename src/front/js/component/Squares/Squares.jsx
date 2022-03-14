import React, { useEffect, useContext, useState } from "react";
import "./squares.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Squares = (props) => {

    const nodisplay = props.img ? "" : "d-none"

    return (
        <div className={`img-square-container bg-alert carousel-inner ${nodisplay}`}>
            <Link to={`/post/${props.id}`}>
                <img className="img-square" src={props.img} alt={props.img} />
                <div className="px-2 games-square carousel-caption d-none d-md-block">
                    <h6>{`${props.game} / ${props.console}`}</h6>
                </div>
            </Link>
        </div>
    )

}

Squares.propTypes = {
    img: PropTypes.string,
    game: PropTypes.string,
    console: PropTypes.string,
    id: PropTypes.number
}

export default Squares;
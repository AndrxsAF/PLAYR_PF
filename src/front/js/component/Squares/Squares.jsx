import React, { useEffect, useContext, useState } from "react";
import "./squares.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Squares = (props) => {

    const nodisplay = props.post.img_url ? "" : "d-none"

    return (
        <div className={`img-square-container bg-alert carousel-inner ${nodisplay}`}>
            <Link to={`/post/${props.post.id}`}>
                <img className="img-square" src={props.post.img_url} alt={props.post.img_url} />
                <div className="px-2 games-square carousel-caption d-none d-md-block">
                    <h6>{`${props.post.game} / ${props.post.console}`}</h6>
                </div>
            </Link>
        </div>
    )

}

Squares.propTypes = {
    post: PropTypes.object
}

export default Squares;
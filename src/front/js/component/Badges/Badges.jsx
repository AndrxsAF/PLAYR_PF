import React from "react";
import "./badges.css";
import PropTypes from "prop-types";


const Badges = (props) => {

    return (
        <span className="badge card-badges">{props.text}</span>
    )

}


Badges.propTypes = {
    text: PropTypes.string
}

export default Badges;

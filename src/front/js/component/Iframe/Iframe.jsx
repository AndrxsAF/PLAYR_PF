import React from "react";
import PropTypes from "prop-types";

const Iframe = (props) => {

    return (
        <iframe id="inlineFrameExample"
            title={props.title}
            height="600"
            src={props.src}>
        </iframe>
    )
}

Iframe.propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
}

export default Iframe
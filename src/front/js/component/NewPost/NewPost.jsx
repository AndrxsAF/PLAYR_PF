import React, { useEffect, useContext, useState } from "react";
import "./newpost.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { func } from "prop-types";

// Pics

// Service 

// Component


const NewPost = (props) => {

    return (
        <div className="pop-up-post p-3 rounded">
            <div className="modal-header p-0 pb-2 mb-2">
                <h5 className="modal-title">Nuevo Post:</h5>
                <button onClick={() => props.close()} type="button" className="btn-close"></button>
            </div>
            <div className="d-flex">
                <div className="container-fluid mb-1 p-0 pe-2">
                    <div className="img-preview mb-2">

                    </div>
                    <label htmlFor="formFile" className="form-label mb-1">Sube una imágen:</label>
                    <input className="form-control" type="file" id="formFile" />
                </div>
                <div className="container-fluid mb-1 p-0 ps-2">
                    <div>
                        <div className="mb-1">
                            <label htmlFor="game" className="form-label">Videojuego:</label>
                            <input type="game" className="form-control" id="game" placeholder="Ex: Portal 2." />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="consola" className="form-label">Consola:</label>
                            <input type="consola" className="form-control" id="consola" placeholder="Ex: Switch." />
                        </div>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="tags" className="form-label">Tags:</label>
                        <textarea className="form-control" id="tags" rows="3" placeholder="Inserta tus #tags separados por espacios (máx. 5)" />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea className="form-control" id="description" rows="3" placeholder="Pon alguna descripción."/>
            </div>
            <div className="modal-footer pb-0">
                <button onClick={() => props.close()} type="button" className="btn btn-secondary">Cerrar</button>
                <button type="button" className="btn btn-primary">Hacer Post</button>
            </div>
        </div>
    )

}

NewPost.propTypes = {
    close : PropTypes.func
}

export default NewPost;
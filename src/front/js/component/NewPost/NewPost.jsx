import React, { useEffect, useContext, useState } from "react";
import "./newpost.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { func } from "prop-types";

// Pics

// Service 
import { uploadNewPost } from "../../service/newpost.js"

// Component


const NewPost = (props) => {

    const [file, setFile] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [game, setGame] = useState('')
    const [platform, setPlatform] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('')

    const handleChangeFile = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (reader.readyState == 2) {
                setFileUrl(reader.result)
                console.log(reader)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    const handleTags = (e) => {
        const text = e.target.value.split(' ')
        const tagsArray = []
        for (let i in text) {
            if (text[i][0] == '#' && text[i].length < 50){
                tagsArray.push(text[i])
            }
        }
        setTags(tagsArray)
    }

    const uploadPost = () => {
        setAlert(false)
        if (game.length > 69) {
            setAlert(true)
            setAlertContent('Máximo 70 caracteres permitidos en el campo de videojuegos.')
        } else if (platform.length > 49) {
            setAlert(true)
            setAlertContent('Máximo 50 caracteres permitidos en el campo de consola.')
        } else if (tags.length > 5) {
            setAlert(true)
            setAlertContent('Máximo 5 tags permitidos.')
        } else if (description.length > 279) {
            setAlert(true)
            setAlertContent('Máximo 280 caracteres permitidos en la descripción.')
        } else if (game == "") {
            setAlert(true)
            setAlertContent('Es obligatorio llenar el campo de videojuego.')
        } else if (platform == "") {
            setAlert(true)
            setAlertContent('Es obligatorio llenar el campo de consola.')
        } else if (fileUrl == "" && description == "") {
            setAlert(true)
            setAlertContent('Cada post debe tener al menos una imagén o una descripción.')
        }
    }

    return (
        <div className="pop-up-post p-3 rounded">
            <div className="modal-header p-0 pb-2 mb-2">
                <h5 className="modal-title">Nuevo Post:</h5>
                <button onClick={() => props.close()} type="button" className="btn-close"></button>
            </div>
            { alert ? (
                <div className="alert alert-danger" role="alert">
                    {alertContent}
                </div>) : null}
            <div className="d-flex newpost-main-container">
                <div className="container-fluid mb-1 p-0 pe-2 pt-1 newpost-container-left">
                    <div className="mb-2 bg-light newpost-img-preview">
                        {
                            fileUrl ? (<img src={fileUrl} className="img-preview img-fluid"></img>) : null
                        }
                    </div>
                    <label htmlFor="formFile" className="form-label mb-1">Sube una imágen:</label>
                    <input onChange={handleChangeFile} className="form-control" type="file" id="formFile" />
                </div>
                <div className="container-fluid mb-1 p-0 ps-2 newpost-container-right">
                    <div>
                        <div className="mb-1">
                            <label htmlFor="game" className="form-label">Videojuego:</label>
                            <input onChange={(e) => setGame(e.target.value)} type="game" className="form-control" id="game" placeholder="Ex: Portal 2." />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="consola" className="form-label">Consola:</label>
                            <input onChange={(e) => setPlatform(e.target.value)} type="consola" className="form-control" id="consola" placeholder="Ex: Switch." />
                        </div>
                    </div>
                    <div className="mb-1">
                        <label htmlFor="tags" className="form-label">Tags:</label>
                        <textarea onChange={handleTags} className="form-control" id="tags" rows="3" placeholder="Inserta tus #tags separados por espacios (máx. 5)" />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows="3" placeholder="Pon alguna descripción."/>
            </div>
            <div className="modal-footer pb-0">
                <button onClick={() => props.close()} type="button" className="btn btn-secondary">Cerrar</button>
                <button onClick={() => uploadPost()} type="button" className="btn btn-primary">Hacer Post</button>
            </div>
        </div>
    )

}

NewPost.propTypes = {
    close : PropTypes.func
}

export default NewPost;
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext"
import "./newpost.css";
import PropTypes from "prop-types";

// Service 
import { uploadNewPost } from "../../service/newpost.js"

const NewPost = (props) => {

    const { store, actions } = useContext(Context)
    const token = actions.getToken();
    const [file, setFile] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [game, setGame] = useState('')
    const [platform, setPlatform] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState([])

    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            setFile(e.target.files[0])
            reader.onload = (e) => {
                if (reader.readyState == 2) {
                    setFileUrl(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const handleTags = (e) => {
        const text = e.target.value.split(' ')
        const tagsArray = []
        for (let i in text) {
            if (text[i][0] == '#' && text[i].length < 50) {
                tagsArray.push(text[i])
            }
        }
        setTags(tagsArray)
    }

    const uploadPost = async () => {
        setAlert(false)
        const alertArr = []
        if (game.length > 69) {
            setAlert(true)
            alertArr.push('- Máximo 70 caracteres permitidos en el campo de videojuegos.')
        }
        if (platform.length > 49) {
            setAlert(true)
            alertArr.push('- Máximo 50 caracteres permitidos en el campo de consola.')
        }
        if (tags.length > 5) {
            setAlert(true)
            alertArr.push('- Máximo 5 tags permitidos.')
        }
        if (description.length > 279) {
            setAlert(true)
            alertArr.push('- Máximo 280 caracteres permitidos en la descripción.')
        }
        if (game == "") {
            setAlert(true)
            alertArr.push('- Es obligatorio llenar el campo de videojuego.')
        }
        if (platform == "") {
            setAlert(true)
            alertArr.push('- Es obligatorio llenar el campo de consola.')
        }
        if (fileUrl == "" && description == "") {
            setAlert(true)
            alertArr.push('- Cada post debe tener al menos una imagén o una descripción.')
        }
        setAlertContent(alertArr)

        if (alertArr.length == 0) {
            try {
                const body = new FormData();
                if (file) {
                    body.append("img", file)
                }
                body.append("description", description)
                body.append("console", platform)
                body.append("game", game)
                for (let i = 0; i < 5; i++) {
                    if (tags[i]) {
                        body.append(`tag${Number(i) + 1}`, tags[i])
                    } else {
                        body.append(`tag${Number(i) + 1}`, "")
                    }
                }
                const resp = await uploadNewPost(body, token)
                const data = await resp.json()
                actions.handleShow()
                actions.handleRefresh()
            } catch (err) {
                console.log(err)
            }
        }
    }


return (
    <div className="pop-up-post p-3 rounded">
        <div className="modal-header p-0 pb-2 mb-2">
            <h5 className="modal-title">Nuevo Post:</h5>
            <button onClick={() => props.close()} type="button" className="btn-close"></button>
        </div>
        {alert ? (
            <div className="alert alert-danger p-2" role="alert">
                {alertContent.map((elem, index) => (<p key={index} className="m-0">{elem}</p>))}
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
            <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" rows="3" placeholder="Pon alguna descripción." />
        </div>
        <div className="modal-footer pb-0">
            <button onClick={() => props.close()} type="button" className="btn btn-secondary">Cerrar</button>
            <button onClick={() => uploadPost()} type="button" className="btn btn-danger">Hacer Post</button>
        </div>
    </div>
)

}

NewPost.propTypes = {
    close: PropTypes.func
}

export default NewPost;
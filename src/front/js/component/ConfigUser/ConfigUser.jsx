import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext"
import "./configuser.css";
import PropTypes from "prop-types";

// Service 
import { changeUserConfig } from "../../service/configuser.js"

const ConfigUser = (props) => {

    const { store, actions } = useContext(Context)
    const token = store.token
    // const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState([])
    const [file, setFile] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [bio, setBio] = useState(props.bio)

    const handleChangeFile = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            setFile(e.target.files[0])
            reader.onload = (e) => {
                if (reader.readyState == 2) {
                    setFileUrl(reader.result)
                    console.log(reader)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        }
    }

    const uploadChanges = async () => {
        setAlert(false)
        const alertArr = []
        if (bio.length > 279) {
            setAlert(true)
            alertArr.push('- Máximo 280 caracteres permitidos en la descripción.')
        }
        if (password.length > 79) {
            setAlert(true)
            alertArr.push('- Máximo 280 caracteres permitidos en la descripción.')
        }
        if (password !== passwordCheck) {
            setAlert(true)
            alertArr.push('- Verifica que las contraseñas coincidan.')
        }
        if (props.bio == bio && password == '' && fileUrl == '') {
            setAlert(true)
            alertArr.push('- Llena algún campo.')
        }
        setAlertContent(alertArr)
        if (alertArr.length == 0) {
            try {
                console.log("chao")
                if (password && password == passwordCheck) {
                    const bodypass = new FormData();
                    bodypass.append("password", password)
                    const resp = await changeUserConfig(bodypass, token)
                    const data = await resp.json()
                }
                if (file) {
                    const bodyfile = new FormData();
                    bodyfile.append("img", file)
                    const resp = await changeUserConfig(bodyfile, token)
                    const data = await resp.json()
                }
                if (bio !== props.bio) {
                    const bodybio = new FormData();
                    bodybio.append("biography", bio)
                    const resp = await changeUserConfig(bodybio, token)
                    const data = await resp.json()
                }
                actions.handleShowUserConfig()
                actions.handleRefresh()
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="p-3 rounded pop-up-config">
            <div className="modal-header p-0 pb-2 mb-2">
                <h5 className="modal-title">Configurar:</h5>
                <button onClick={props.close} type="button" className="btn-close"></button>
            </div>
            {alert ? (
                <div className="alert alert-danger p-2" role="alert">
                    {alertContent.map((elem, index) => (<p key={index} className="m-0">{elem}</p>))}
                </div>) : null}
            <div className="d-flex newpost-main-container">
                <div className="container-fluid mb-1 p-0 pe-2 pt-1 newpost-container-left">
                    <div className="mb-2 bg-light newpost-img-preview">
                        {
                            fileUrl ? (<img src={fileUrl} className="img-preview img-fluid"></img>) : (<img src={props.img} className="img-preview img-fluid"></img>)
                        }
                    </div>
                    <label htmlFor="formFile" className="form-label mb-1">Sube una imágen:</label>
                    <input onChange={handleChangeFile} className="form-control" type="file" id="formFile" />
                </div>
                <div className="container-fluid mb-1 p-0 ps-2 newpost-container-right">
                    <div>
                        <div className="mb-1">
                            <label htmlFor="tags" className="form-label">Biografía:</label>
                            <textarea onChange={(e) => setBio(e.target.value)} className="form-control" id="bio" rows="5" placeholder="Pon una biografia para que usuarios de todo el mundo te conozcan mejor." value={bio} />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="password" className="form-label">Pon tu nueva contraseña:</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="password" />
                        </div>
                        <div className="mb-1">
                            <label htmlFor="passwordcheck" className="form-label">Repite la contraseña nueva:</label>
                            <input onChange={(e) => setPasswordCheck(e.target.value)} type="passwordcheck" className="form-control" id="passwordcheck" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer mt-2 pb-0">
                <button onClick={props.close} type="button" className="btn btn-secondary">Cerrar</button>
                <button onClick={uploadChanges} type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
        </div>
    )

}

ConfigUser.propTypes = {
    close: PropTypes.func,
    img: PropTypes.string,
    bio: PropTypes.string
}

export default ConfigUser;
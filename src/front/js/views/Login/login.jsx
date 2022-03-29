import React, { useContext, useState, useEffect } from "react";
import "./login.css";
import { Context } from "../../store/appContext.js";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "../../service/user.js";

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { actions, store } = useContext(Context);
	const [background, setBackground] = useState("")
	const [catchphrase, setCatchphrase] = useState("")
	const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState([])

	const selectbackground = () => {
		const randomBackground = Math.floor(Math.random() * (4 - 1) + 1)
		if (randomBackground == 1) {
			setBackground("bg-togepi") 
		} else if (randomBackground == 2) {
			setBackground("bg-colorful") 
		} else {
			setBackground("bg-ps") 
		}
	}
	const selectcatchphrase = () => {
		const randomBackground = Math.floor(Math.random() * (6 - 1) + 1)
		if (randomBackground == 1) {
			setCatchphrase(["Más amigos.", "Más partidas."]) 
		} else if (randomBackground == 2) {
			setCatchphrase(["Tu mundo.", "Tus reglas."])  
		} else if (randomBackground == 3) {
			setCatchphrase(["Sigue jugando.", "Sigue compartiendo."])  
		} else if (randomBackground == 4) {
			setCatchphrase(["Conectate a PLAYR.", "Diviertete en PLAYR."])  
		} else {
			setCatchphrase(["Tu juego.", "Tus experiencias."])  
		}
	}

	const handle_user = async () => {
		setAlert(false)
        const alertArr = []
        if (email == "") {
            setAlert(true)
            alertArr.push('- Debes llenar el campo de usuario.')
        }
        if (password == "") {
            setAlert(true)
            alertArr.push('- Debes llenar el campo de contraseña.')
        }
        setAlertContent(alertArr)
        if (alertArr.length == 0) {
			try {
				const res = await loginUser(email, password, history);
				const dataJSON = await res.json();
				if (dataJSON == false) {
					alertArr.push('- Combinación incorrecta.')
					setAlertContent(alertArr)
					setAlert(true)
				} else {
					localStorage.setItem("token", dataJSON.token);
              		history.push("/")
					setTimeout(() => actions.handleRefresh(), 500)
				}
				
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		actions.setLoginSwitchTrue()
		selectbackground()
		selectcatchphrase()
	}, [])

	return (
		<div className={`container-fluid p-0 background-login ${background} vh-100`}>
			<div className="d-flex justify-content-center align-items-center">
				<div className="login-container-left d-flex justify-content-end align-items-center">
				<img className="img-login" src="https://res.cloudinary.com/andrxsaf/image/upload/v1648158025/Picture1_jzdlwe.png" />
				<div className="d-flex flex-column align-items-end">
					<p className="fs-5 text-break username custom-font bg-light m-0">{catchphrase[0]}</p><br/>
					<p className="fs-5 text-break username custom-font bg-light m-0">{catchphrase[1]}</p>
				</div>
				</div>
				<div className="login-container-right d-flex flex-column align-items-center register-form">
					<div className="card p-3 login-form">
						<img src="https://res.cloudinary.com/andrxsaf/image/upload/v1648148563/logo_proyecto_usumwb.png" alt="PLAYR" className="logo" />
						<p className="username title-login custom-font text-center">Inicia sesión y comienza a compartir en PLAYR</p>
						{alert ? (
							<div className="alert alert-danger p-2 mt-2 mb-0" role="alert">
								{alertContent.map((elem, index) => (<p key={index} className="m-0">{elem}</p>))}
							</div>) : null}
						<div className="mt-3">
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu usuario o mail."
								onChange={(e) => setEmail(e.target.value)}
							/>
							<div id="emailHelp" className="form-text"></div>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Ingresa tu contraseña."
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="d-flex justify-content-center pt-2">
							<button className="btn btn-danger" type="button" onClick={handle_user}>Iniciar sesión</button>
						</div>
					</div>
					<div className="mt-3 card card-body login-form register-form">
						<p className="text-center m-0">¿No tienes una cuenta?<br/><Link className="username text-color-black" to={`/register`}>Registrate en PLAYR</Link> </p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login

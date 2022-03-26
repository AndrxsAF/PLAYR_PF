import React, { useContext, useState, useEffect } from "react";
import "./register.css";
import { Context } from "../../store/appContext.js";
import { useHistory, Link } from "react-router-dom";
import { registerUser } from "../../service/user.js";

const Register = () => {
	const history = useHistory();
	const [email, setEmail] = useState("")
	const [user, setUser] = useState("")
	const [password, setPassword] = useState("")
	const [verifyPassword, setVerifyPassword] = useState("")
	const [terms, setTerms] = useState(false)
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

	const handle_register = async () => {
		console.log("holis")
		setAlert(false)
        const alertArr = []
		if (terms == false) {
            setAlert(true)
            alertArr.push('- Debes aceptar los terminos y condiciones.')
        }
        if (email == "") {
            setAlert(true)
            alertArr.push('- Debes llenar el campo de email.')
        }
		if (user == "") {
            setAlert(true)
            alertArr.push('- Debes llenar el campo de usuario.')
        }
        if (password == "") {
            setAlert(true)
            alertArr.push('- Debes llenar el campo de contraseña.')
        }
		if (password !== verifyPassword) {
            setAlert(true)
            alertArr.push('- Verifica las contraseñas.')			
		}
        setAlertContent(alertArr)
        if (alertArr.length == 0) {
			try {
				const res = await registerUser(email, user, password, history);
				const dataJSON = await res.json();
				if (dataJSON == "Email already taken.") {
					alertArr.push('- El email ya esta en uso.')
					setAlertContent(alertArr)
					setAlert(true)
				} else if (dataJSON == "Username already taken.") {
					alertArr.push('- El username ya esta en uso.')
					setAlertContent(alertArr)
					setAlert(true)
				} else if (dataJSON == "Internal server error") {
					alertArr.push('- Error desconocido.')
					setAlertContent(alertArr)
					setAlert(true)
				} else {
              		history.push("/login")
				}
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		actions.setLoginSwitchFalse()
		selectbackground()
		selectcatchphrase()
	}, [])

	return (
		<div className={`container-fluid p-0 background-login ${background} vh-100`}>
			<div className="d-flex justify-content-center align-items-center">
				<div className="login-container-right d-flex flex-column align-items-center">
					<div className="card p-3 login-form register-form">
						<img src="https://res.cloudinary.com/andrxsaf/image/upload/v1648148563/logo_proyecto_usumwb.png" alt="PLAYR" className="logo" />
						<p className="username title-login custom-font text-center">Registrate y comienza a compartir en PLAYR</p>
						{alert ? (
							<div className="alert alert-danger p-2 mt-2 mb-0" role="alert">
								{alertContent.map((elem, index) => (<p key={index} className="m-0">{elem}</p>))}
							</div>) : null}
						<div className="mb-1 pt-3">
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="email"
								placeholder="Ingresa tu correo electronico."
								onChange={(e) => setEmail(e.target.value)}

							/>
						</div>
						<div className="mb-1">
							<input
								type="text"
								className="form-control"
								id="username"
								placeholder="Ingresa tu usuario."
								onChange={(e) => setUser(e.target.value)}
							/>
						</div>
						<div className="mb-1">
							<input
								type="password"
								className="form-control"
								id="password"
								placeholder="Ingresa tu contraseña."
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="verifyPassword"
								placeholder="Verifica tu contraseña."
								onChange={(e) => setVerifyPassword(e.target.value)}
							/>
						</div>

						<div className="mb-3 form-check">
							<input
								onChange={() => terms ? setTerms(false) : setTerms(true)}
								type="checkbox"
								className="form-check-input"
								id="exampleCheck1"
							/>
							<label
								className="form-check-label username"
								htmlFor="exampleCheck1">
								Acepto los terminos y condiciones.
							</label>
						</div>
						<div className="d-flex justify-content-center pt-2">
							<button className="btn btn-danger" type="button" onClick={handle_register}>Registrate</button>
						</div>
					</div>
					<div className="mt-3 card card-body login-form register-form">
						<p className="text-center m-0">¿Ya tienes una cuenta?<br /><Link className="username text-color-black" to={`/login`}>Inicia sesión en PLAYR</Link> </p>
					</div>
				</div>
				<div className="login-container-left d-flex justify-content-start align-items-center">
					<div className="d-flex flex-column align-items-start">
						<p className="fs-5 text-break username custom-font bg-light m-0">{catchphrase[0]}</p><br />
						<p className="fs-5 text-break username custom-font bg-light m-0">{catchphrase[1]}</p>
					</div>
					<img className="img-login" src="https://res.cloudinary.com/andrxsaf/image/upload/v1648188289/Picture3_bggnnc.png" />
				</div>
			</div>
		</div>
	);
};

export default Register;

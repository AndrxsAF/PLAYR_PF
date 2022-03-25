import React, { useContext, useState, useEffect } from "react";
import "./login.css";
import { Context } from "../../store/appContext.js";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
	const history = useHistory();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { actions, store } = useContext(Context);
	const background = () => {
		const randomBackground = Math.floor(Math.random() * (4 - 1) + 1)
		if (randomBackground == 1) {
			return "bg-togepi"
		} else if (randomBackground == 2) {
			return "bg-colorful"
		} else {
			console.log(randomBackground)
			return "bg-ps"
		}
	}

	const handle_user = () => {
		actions.setLogin(email, password, history);
		setTimeout(() => actions.handleRefresh(), 500)
	}

	const handle_click = () => {
		return history.push("/register")
	}

	useEffect(() => {
		actions.setLoginSwitchTrue()
	}, [])

	return (
		<div className={`container-fluid justify-content-center p-0 background-login ${background()} vh-100 d-flex row pt-5`}>
			<div className="login-container-left">
				<img className="img-login" src="https://res.cloudinary.com/andrxsaf/image/upload/v1648158025/Picture1_jzdlwe.png" />
			</div>
			<div className="login-container-right">
				<div className="card p-3">
					<img src="https://res.cloudinary.com/andrxsaf/image/upload/v1648148563/logo_proyecto_usumwb.png" alt="PLAYR" className="logo" />
					<div className="mt-3">
						<input
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
							placeholder="Ingresa tu usuario o correo electronico."
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
				<div className="mt-3 card card-body">
					<p className="text-center m-0">¿No tienes una cuenta?<br/><Link className="username text-color-black" to={`/register`}>Registrate en PLAYR</Link> </p>
				</div>
			</div>
		</div>
	);
};

export default Login

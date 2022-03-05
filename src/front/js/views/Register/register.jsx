import React, { useContext, useState, useEffect } from "react";
import "./register.css";
import { Form } from "bootstrap";
import { Context } from "../../store/appContext.js";

const Register = () => {

	const [email, setEmail] = useState("")
	
	const [user, setUser] = useState("")

	const [password, setPassword] = useState("")

	const [verifyPassword, setVerifyPassword] = useState("")

	const { actions } = useContext(Context);

	useEffect = () => {
		
		actions.register(email, user, password, verifyPassword)

	}

	return (
		<div className="container-fluid container-main-page p-0">
			<div className="d-flex justify-content-center p-0 container-main-phoneview">
			<div id="Container-lef" className="container-fluid col align-self-center">
				<div id="Titulo" className="col-3 offset-4 d-flex justify-content-between">
					<h1>PLAYR</h1>
					<p>The Social <br />
						Gaming App
					</p>
				</div>
				<hr className="col-md-4 offset-md-4 col-sm-12 offset-sm-1"></hr>
				<div className="col-md-4 offset-md-4 col-sm-12 offset-sm-1">
					<p>Registrate y adentrate en el mundo gaming.</p>
				</div>
				<div id="body" className="col-md-4 offset-md-4 col-sm-12">
					<form id="form" className="card card-body">
						<div className="mb-3">
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
								placeholder="Ingresa tu correo electronico."
							/>
							<div id="emailHelp" className="form-text"></div>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Ingresa tu usuario."
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Ingresa tu contraseña."
							/>
						</div>
						<div className="mb-3">
							<input
								type="password"
								className="form-control"
								id="exampleInputPassword1"
								placeholder="Verifica tu contraseña."
							/>
						</div>
						<div className="mb-3 form-check">
							<input
								type="checkbox"
								className="form-check-input"
								id="exampleCheck1"
							/>
							<label
								className="form-check-label"
								htmlFor="exampleCheck1">
								Acepto los terminos y condiciones.
							</label>
						</div>
						<div className="d-grid gap-2 col-3 offset-4">
							<button type="button" className="btn btn-primary">
								Registrate
							</button>
						</div>
					</form>
					
				
					<div id="container-right-support p-0" className="card card-body">
					<img src="img_girl.jpg" alt="Girl in a jacket" width="300px" height="200px" />
					<p className="card card-body text-center">¿Ya tienes una cuenta? <a href="http://www.login.com">Ingresa en tu PLAYR</a></p>
					
					</div>
				</div>
			</div>
			</div>
		</div>
	);
};

export default Register;

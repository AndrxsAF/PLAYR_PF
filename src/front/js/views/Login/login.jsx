import React, { useContext, useState, useEffect } from "react";
import "./login.css";
import { Form } from "bootstrap";
import { Context } from "../../store/appContext.js";


const Login = () => {

		const [email, setEmail] = useState("")

		const [user, setUse] = useState("")

		const [password, setPassword] = useState("")

		const { actions } = useContext(Context);

	

	const handle_user = () => {

		actions.setLogin(email, user, password);
		setTimeout(function() { window.location.replace ("/") })

	}

	const handle_click = () => {
		return window.location.replace ("/register")
	}


	console.log(email)
	console.log(password)


	return (
		<div className="container-fluid container-main-page p-0">
			<div className="d-flex justify-content-center p-0 container-main-phoneview">
				<div id="Container-lef" className="container-fluid col align-self-center">
					<div id="body" className="col-md-6 offset-md-3 col-sm-12">
						<div className="card card-body">
							<img src="https://dummyimage.com/207x200/000/fff" />
						</div>
						<form id="form" className="card card-body">
							<div id="Container-right" className="col-12 d-flex justify-content-between">
								<h1>PLAYR</h1>
								<p className="Subtitulo">The Social <br />
									Gaming App
								</p>
							</div>
							<hr></hr>
							<div className="mb-3">
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
							<div className="mb-3 form-check">
								<input
									type="checkbox"
									className="form-check-input"
									id="exampleCheck1"
								/>
								<label
									className="form-check-label"
									htmlFor="exampleCheck1">
									Mantener sesión iniciada.
								</label>
								<br></br>
								<br></br>
								<div className="d-grid gap-2 col-3 offset-4">

									<button className="btn btn-primary" type="button" onClick={ handle_user }>
										Iniciar sesión</button>
								</div>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
								<br></br>
							</div>
							

							<div className="d-grid gap-7 col-7 offset-2">
								<p className="card card-body text-center">¿No tienes una cuenta? <button className="btn btn-primary" type="button" onClick={ handle_click }>Registrate en PLAYR</button></p>
							
						</div>
						</form>

						

					</div>
				</div>
			</div>
		</div>
	);
};

export default Login

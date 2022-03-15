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

	const handle_register = () => {
		
		actions.setRegister(email, user, password, verifyPassword);
		setTimeout(function() { window.location.replace ("/main") })

	}

	const handle_click = () => {
		return window.location.replace ("/login")
	}


	console.log(email)
	console.log(user)
	console.log(password)

	return (
	
		<div className="container-fluid container-main-page p-0">
			<div className="d-flex justify-content-center p-0 container-main-phoneview">
				<div id="Container-lef" className="container-fluid col align-self-center">
					<div id="body" className="col-md-6 offset-md-3 col-sm-">
						<form id="form" className="card card-body">
							<div id="Titulo" className="col-12 d-flex justify-content-between">
								<h1>PLAYR</h1>
								<p>The Social <br />
									Gaming App
								</p>
							</div>
							<hr></hr>
							<div className="col-8">
								<p>Registrate y adentrate en el mundo gaming.</p>
							</div>
							<br></br>
							<br></br>
							<br></br>
							<div className="mb-3">
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
									placeholder="Ingresa tu correo electronico."
									onChange={(e) => setEmail(e.target.value)}
																
								/>
								<div id="emailHelp" className="form-text"></div>
							</div>
							<div className="mb-3">
								<input
									type="text"
									className="form-control"
									id="exampleInputUser1"
									placeholder="Ingresa tu usuario."
									onChange={(e) => setUser(e.target.value)}
								/>
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
							<div className="mb-3">
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
									placeholder="Verifica tu contraseña."
									onChange={(e) => setVerifyPassword(e.target.value)}
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
							<div className="d-grid gap-7 col-7 offset-2">
								<button className="btn btn-primary" type="button" onClick={ handle_register }>
									Registrate
								</button>
							</div>
						</form>

						<div id="container-right" className="card card-body">
							<img src="https://dummyimage.com/310x250/000/fff"/>
							<div className="d-grid gap-8 col-8 offset-2">
								<br></br>
								<p className="card card-body text-center">¿Ya tienes una cuenta? <button className="btn btn-primary" type="button" onClick={ handle_click }>Ingresa en tu PLAYR</button></p>
							</div>

						</div>

					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;

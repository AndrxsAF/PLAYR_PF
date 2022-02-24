import React from "react";
import "./register.css";
import { Form } from "react-bootstrap";

const Register = () => {
	return (
		<div className="Container0">
			<div id="Container1" className="container-fluid wh-100 col align-self-center">
				<div id="Titulo" className="col-3 offset-4 d-flex justify-content-between">
					<h1>PLAYR</h1>
					<p>The Social <br />
						Gaming App
					</p>
				</div>
				<hr className="col-3 offset-4"></hr>
				<div className="col-3 offset-4">
					<p>Registrate y adentrate en el mundo gaming.</p>
				</div>
				<container className="body1">
					<div className="col-3 offset-4">
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
							<div class="mb-3">
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
									for="exampleCheck1">
									Acepto los terminos y condiciones.
								</label>
							</div>
							<div className="d-grid gap-2 col-6 mx-auto">
								<button className="btn btn-primary" type="button">
									Registrate
								</button>
							</div>
						</form>
					</div>
								
					<div id="Container2" className="col-6 offset-4">
						<div className="card card-body col-6 offset-4">
							<img src="img_girl.jpg" alt="Girl in a jacket" width="5000px" height="242px" />
						</div>
						<div className="card card-body col-6 offset-4">
							<p class="text-center">¿Ya tienes una cuenta?</p>
							<button type="button" class="btn btn-outline-primary">Ingresa en tu PLAYR</button>
						</div>
					</div>
				 </container>
			</div>
		</div>
	);
};

export default Register;

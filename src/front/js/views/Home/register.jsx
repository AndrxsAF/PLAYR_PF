import React from "react";

const Register = () => {
    return(
       <div>
           <h1>PLAYER</h1><P>The Social Gamin App</P>
           <form>
  <div class="mb-3">
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu correo electronico.">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Ingresa tu usuario.">
  </div>
  <div class="mb-3">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Ingresa tu contraseña.">
  </div>
  <div class="mb-3">
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Verifica tu contraseña.">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Acepto los terminos y condiciones.</label>
  </div>
  <div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-primary" type="button">Registrate</button>
  </div>
</form>

       </div> 

    )
}

export default Register;
import { useState } from "react";
import Head from 'next/head'
import Link from 'next/link';

import styles from '../styles/Home.module.css'
import api from './../backend/peticiones';
import { useAuth } from './../context/globalContext';
import { routes } from './../backend/routes';

export default function Home() {
	const { setToken } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.elements['emailLogin'].value;
    const password = e.target.elements['contrasenaLogin'].value;
    api.post(routes.login, { username, password })
    .then(({data}) => {
    		setToken(data.token, data.refreshtoken, data.user)
    })
    .catch((error) => {
        setLoading(false);
        alert('Usuario y/o contrasena invalidas')
    });
  }

  return (
    <div className={`${styles.container}`}>
    	<Head>
    		<title>Login</title>
    	</Head>
      <div className="card">
			  <div className="card-header">
			    Login
			  </div>
			  <div className="card-body">
			  	<form onSubmit={handleFormSubmit}>
			  		<fieldset disabled={loading}>
						  <div className="form-group">
						    <label htmlFor="emailLogin">Correo</label>
						    <input type="email" className="form-control" id="emailLogin"/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="contrasenaLogin">Contraseña</label>
						    <input type="password" className="form-control" id="contrasenaLogin"/>
						  </div>
						  <button type="submit" className="btn btn-primary">Ingresar</button>
						</fieldset>  
					</form><br/>
			    <p className="card-text">Si no tienes una cuenta, registrate <Link href='/registro'><a>aquí</a></Link></p>
			  </div>
			</div>
    </div>
  )
}

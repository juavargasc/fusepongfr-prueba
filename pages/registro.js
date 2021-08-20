import { useState } from "react";
import Head from 'next/head'
import Link from 'next/link';
import Router from "next/router";

import styles from '../styles/Home.module.css'
import api from './../backend/peticiones';
import { useAuth } from './../context/globalContext';
import { routes } from './../backend/routes';

export default function Registro() {
	const { company } = useAuth();
	const [loading, setLoading] = useState(false);

	const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const first = e.target.elements['name'].value;
    const last = e.target.elements['lastname'].value;
    const user = e.target.elements['email'].value;
    const password = e.target.elements['password'].value;
    const company = e.target.elements['company'].value;
    api.post(routes.signup, { first, last, user, password, company })
    .then((response) => {
        setLoading(false);
        alert('Usuario creado correctamente')
        Router.push('/')
    })
    .catch((error) => {
        setLoading(false);
        alert('El correo ya esta registrado')
    });
  }

  return (
    <div className={`${styles.container}`} style={{'marginTop':'10px', 'marginBottom':'100px'}}>
    	<Head>
    		<title>Registro</title>
    	</Head>
      <div className="card">
			  <div className="card-header">
			    Registro
			  </div>
			  <div className="card-body">
			  	<form onSubmit={handleFormSubmit}>
			  		<fieldset disabled={loading}>
						  <div className="form-group">
						    <label htmlFor="name">Nombre</label>
						    <input type="text" className="form-control" id="name" required/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="lastname">Apellido</label>
						    <input type="text" className="form-control" id="lastname" required/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="email">Correo</label>
						    <input type="email" className="form-control" id="email" required/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="password">Contraseña</label>
						    <input type="password" className="form-control" id="password" required/>
						  </div>
						  <div className="form-group">
						    <label htmlFor="company">Compañia</label>
						    <select className="form-control" id="company">
						    	{
						    		company && company.length !== 0 && company.map( (comp) => {
						    			return (
						    				<option key={comp._id} value={comp._id}>{comp.name}</option>
						    			)
						    		})	
						    	}
						    </select>
						  </div>
					  	<button type="submit" className="btn btn-primary">{loading ? "Procesando.." : "Guardar"}</button>
					  </fieldset>
					</form><br/>
			    <p className="card-text">Si ya tienes una cuenta, clic <Link href='/'><a>aquí</a></Link></p>
			  </div>
			</div>
    </div>
  )
}

import Head from 'next/head'

import { useAuth } from './../context/globalContext';

export default function Dashboard() {
	const { userData, company, project } = useAuth();
	
	return (
    <div className="container pt-4">
    	<Head>
    		<title>Dashboard</title>
    	</Head>
    	{
    		userData && company && company.length !== 0 && company.map( (comp) => {
    			if (comp._id == userData.company) {
    				return (
	    				<h1 key={comp._id}>{comp.name}</h1>
	    			)
    			}
    		})	
    	}
    	<h4>Tus proyectos:</h4>
    	<select className="form-control">
    		<option value="">Seleccione...</option>
    		{
	    		project && project.length !== 0 && project.map( (proy) => {
    				return (
	    				<option key={proy._id} value={proy._id}>{proy.name}</option>
	    			)
	    		})	
	    	}
    	</select>
    </div>
  )
}

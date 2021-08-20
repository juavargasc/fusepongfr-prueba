import Head from 'next/head'
import { useState } from "react";

import api from './../backend/peticiones';
import { useAuth } from './../context/globalContext';
import { routes } from './../backend/routes';

export default function Dashboard() {
	const { userData, company, project } = useAuth();
  const [stories, setStories] = useState([]);
  const [projectItem, setProjectItem] = useState(null);
  const [storieItem, setStorieItem] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
	
  const getUserStories = async (e) => {
    if (e.target.value != '') {
      setProjectItem(e.target.value)
      consultaStorie(e.target.value)
    }else{
      setProjectItem(null)
      setStories([])
    }
  }

  const consultaStorie = async (project) => {
    await api.get(routes.userStorie+project)
    .then(async ({ data }) => {
        setStories(data.docs)
    })
    .catch((error) => {
        alert('Error en la consulta')
        setStories([])
    })    
  }

  const getTickets = async (e, storie) => {
    setStorieItem(storie)
    consultaTickets(storie)
  }

  const consultaTickets = async (storie) => {
    await api.get(routes.ticket+storie)
    .then(async ({ data }) => {
        console.log('tickets',data.docs)
        setTickets(data.docs)
    })
    .catch((error) => {
        alert('Error en la consulta')
        setTickets([])
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements['name'].value;
    const description = e.target.elements['description'].value;
    const project = projectItem;
    api.post(routes.createStorie, { name, description, project })
    .then(({data}) => {
      setLoading(false);
      consultaStorie(projectItem)
      $('#nuevaHistoria').modal('toggle')
    })
    .catch((error) => {
        setLoading(false);
        alert('Error en la creación')
    });
  }

  const handleFormSubmitUpd = (e, elementId) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements['name'].value;
    const description = e.target.elements['description'].value;
    const id = elementId;
    api.put(routes.updateStorie, { name, description, id })
    .then(({data}) => {
      setLoading(false);
      consultaStorie(projectItem)
      $(`#editarHistoria${elementId}`).modal('toggle')
    })
    .catch((error) => {
        setLoading(false);
        alert('Error en la creación')
    });
  }

  const handleFormSubmitT = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements['name'].value;
    const description = e.target.elements['description'].value;
    const status = e.target.elements['status'].value;
    const userStorie = storieItem;
    api.post(routes.createTicket, { name, description, status, userStorie })
    .then(({data}) => {
      setLoading(false);
      consultaTickets(storieItem)
      $('#nuevoTicket').modal('toggle')
    })
    .catch((error) => {
        setLoading(false);
        alert('Error en la creación')
    });
  }

  const handleFormSubmitTupd = (e, elementId) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements['name'].value;
    const description = e.target.elements['description'].value;
    const status = e.target.elements['status'].value;
    const id = elementId;
    api.put(routes.updateTicket, { name, description, status, id })
    .then(({data}) => {
      setLoading(false);
      consultaTickets(storieItem)
      $(`#editarTicket${elementId}`).modal('toggle')
    })
    .catch((error) => {
        setLoading(false);
        alert('Error en la edicion')
    });
  }

	return (
    <div className="container mt-4 pb-5">
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
    	<h3 className="mt-3">Tus proyectos:</h3>
    	<select className="form-control mb-3" onChange={getUserStories}>
    		<option value="">Seleccione...</option>
    		{
	    		project && project.length !== 0 && project.map( (proy) => {
    				return (
	    				<option key={proy._id} value={proy._id}>{proy.name}</option>
	    			)
	    		})	
	    	}
    	</select>
      {
        projectItem && <h4 className="mt-5">Historias de usuario: <span style={{'cursor':'pointer'}} className="badge badge-secondary" data-toggle="modal" data-target="#nuevaHistoria">Crear</span></h4>
      }      
      <div className="accordion" id="accordionExample">
        {
          stories && stories.length !==0 && stories.map( (stor) => {
            return (
              <div className="card" key={stor._id}>
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button className="btn btn-link btn-block text-left" onClick={(e) => getTickets(e,stor._id)} type="button" data-toggle="collapse" data-target={`#collapse${stor._id}`} aria-expanded="true" aria-controls={`#collapse${stor._id}`}>
                      <h6>{stor.name} <span className="badge badge-secondary" data-toggle="modal" data-target={`#editarHistoria${stor._id}`}>Editar</span></h6>
                    </button>
                  </h2>
                </div>

                <div id={`collapse${stor._id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div className="card-body">
                    {stor.description}
                    {
                      storieItem && <h5 className="mt-3 mb-3">Tareas: <span style={{'cursor':'pointer'}} className="badge badge-secondary" data-toggle="modal" data-target="#nuevoTicket">Crear</span></h5>
                    }
                    <div className={ tickets && tickets.length !==0 ? `table-responsive` : 'd-none'}>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Tarea</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <td>Acciones</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            stor._id == storieItem && tickets && tickets.length !==0 && tickets.map( (tick) => {
                              return (
                                <tr key={tick._id}>
                                  <td>{tick.name}</td>
                                  <td>{tick.description}</td>
                                  <td>{tick.status}</td>
                                  <td>
                                    <span style={{'cursor':'pointer'}} className="badge badge-secondary" data-toggle="modal" data-target={`#editarTicket${tick._id}`}>Editar</span> / ver comentarios
                                    <div className="modal fade" id={`editarTicket${tick._id}`} tabIndex="-1" aria-labelledby={`editarTicket${tick._id}Label`} aria-hidden="true">
                                      <div className="modal-dialog">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Editar tarea</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={(e) => handleFormSubmitTupd(e, tick._id)}>
                                              <fieldset disabled={loading}>
                                                <div className="form-group">
                                                  <label htmlFor="name">Titulo</label>
                                                  <input type="text" className="form-control" id="name" defaultValue={tick.name} required/>
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="description">Descripción</label>
                                                  <input type="text" className="form-control" id="description" defaultValue={tick.description} required/>
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="status">Estado</label>
                                                  <select id="status" className="form-control" defaultValue={tick.status} required>
                                                    <option value="En proceso">En proceso</option>
                                                    <option value="Finalizado">Finalizado</option>
                                                  </select>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Guardar</button>
                                              </fieldset>  
                                            </form><br/>
                                          </div>
                                          <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id={`editarHistoria${stor._id}`} tabIndex="-1" aria-labelledby={`editarHistoria${stor._id}Label`} aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar historia de usuario</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={(e) => handleFormSubmitUpd(e, stor._id)}>
                          <fieldset disabled={loading}>
                            <div className="form-group">
                              <label htmlFor="name">Titulo</label>
                              <input type="text" className="form-control" id="name" defaultValue={stor.name} required/>
                            </div>
                            <div className="form-group">
                              <label htmlFor="description">Descripción</label>
                              <input type="text" className="form-control" id="description" defaultValue={stor.description} required/>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                          </fieldset>  
                        </form><br/>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="modal fade" id="nuevaHistoria" tabIndex="-1" aria-labelledby="nuevaHistoriaLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nueva historia de usuario</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <fieldset disabled={loading}>
                  <div className="form-group">
                    <label htmlFor="name">Titulo</label>
                    <input type="text" className="form-control" id="name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input type="text" className="form-control" id="description" required/>
                  </div>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </fieldset>  
              </form><br/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="nuevoTicket" tabIndex="-1" aria-labelledby="nuevoTicketLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Nueva tarea</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmitT}>
                <fieldset disabled={loading}>
                  <div className="form-group">
                    <label htmlFor="name">Titulo</label>
                    <input type="text" className="form-control" id="name" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input type="text" className="form-control" id="description" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Estado</label>
                    <select id="status" className="form-control" required>
                      <option value="Activo">Activo</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </fieldset>  
              </form><br/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

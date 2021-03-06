import Link from 'next/link';

import { useAuth } from './../../../context/globalContext';
import styles from  './header.module.css'

function Header(){
	const { isAuthenticated, logout, userData } = useAuth();
	return (
		<div className={styles.header}>
      		<div className={`container-fluid ${styles.padding}`}>
      			<div className="row">
			        <div className="d-flex col-4">
			            <Link href={ isAuthenticated ? '/dashboard' : '/' }>
			              	<a>
			                	Prueba técnica
			              	</a>
			            </Link>
			        </div>
			        <div className={`d-none d-sm-flex col-sm-4`} >
			        </div>
			        <div className={ isAuthenticated ? `d-flex col-8 col-sm-4` : 'd-none'} >
			        	Bienvenido, {userData ? userData.first : ''} {userData ? userData.last : ''} <a href="#" onClick={logout} style={{'marginLeft':'10px','color':'blue'}}> Cerrar sesión</a>
			        </div>
			    </div>
      		</div>
      	</div>
	)
}

export default Header;
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';

import { ContextProvider } from '../context/globalContext';
import MainLayout from '../components/layout/mainLayout';

import '../styles/globals.css'

library.add(fas, far, fab)

function MyApp({ Component, pageProps }) {
  	return (
        <ContextProvider>
            <MainLayout>
        		<Component {...pageProps}/>
      		</MainLayout>
      		<script async src="/jquery-3.5.1.slim.min.js" ></script>
      		<script async src="/bootstrap.min.js" ></script>
        </ContextProvider>
    )
}

export default MyApp

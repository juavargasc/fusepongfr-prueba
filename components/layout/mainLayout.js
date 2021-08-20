import Header from './header/header'
import Footer from './footer/footer'

const MainLayout = ({ children }) => {
	return (
		<div>
			<Header></Header>
			<div>{children}</div>
			<Footer></Footer>
	    </div>
	)
};

export default MainLayout;
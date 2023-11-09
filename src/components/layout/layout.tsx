import Header from './head-nav';
import Navbar from './nav';
import { Outlet } from 'react-router-dom';

const Layout = () => (
	<div className="layout">
		<div className="flex">
			<div className="w-fit">
				<Navbar />
			</div>
			<div className="flex-grow">
				{/* <Header /> */}
				{/* This is where the child routes will be rendered */}
				<Outlet />
			</div>
		</div>
	</div>
);

export default Layout;

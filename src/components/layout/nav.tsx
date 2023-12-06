import React from 'react';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaWallet } from 'react-icons/fa';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoSettings } from 'react-icons/io5';
import { PiUserCircleFill } from 'react-icons/pi';
import { ImExit } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearUser } from '../../store/slice/user';
import { useAuth0 } from '@auth0/auth0-react';
import { clearChat } from '../../store/slice/chat';
import { clearMessages } from '../../store/slice/message';

const Navbar = () => {
	const [open, setOpen] = useState(true);
	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const [menus, _] = useState([
		{ name: 'Dashboard', link: '/', icon: MdOutlineDashboard },
		{ name: 'My Wallet', link: '/mywallet', icon: FaWallet },
		{ name: 'Recent Transactions', link: '/rcttransactions', icon: FaMoneyBillWave },
		{ name: 'Talk to Alchemo', link: '/chat', icon: BsFillChatDotsFill },
		{ name: 'Settings', link: '/settings', icon: IoSettings, margin: true },
		{
			name: user?.name,
			link: '/profile',
			icon: PiUserCircleFill,
		},
	]);
	const { logout } = useAuth0();

	const dispatch = useDispatch();

	return (
		<div className={`bg-[#080325] min-h-screen ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 px-4`}>
			<div className="py-3 flex flex-col justify-between items-center">
				{/* Logo Image */}
				<img src="/logo.png" className="cursor-pointer" alt="Ledger Alchemy" onClick={() => setOpen(!open)} />
				{/* Menu Icon 
				<HiMenuAlt3 size={26} className="cursor-pointer" />*/}
			</div>
			<div className="mt-4 flex flex-col gap-4 relative">
				<>
					{menus?.map((menu, i) => (
						<Link
							to={menu?.link}
							key={i}
							className={` ${
								menu?.margin && 'mt-5'
							} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
						>
							<div>{React.createElement(menu?.icon, { size: '20' })}</div>
							<h2
								style={{
									transitionDelay: `${i + 3}00ms`,
								}}
								className={`whitespace-pre duration-500 ${
									!open && 'opacity-0 translate-x-28 overflow-hidden'
								}`}
							>
								{menu?.name}
							</h2>
							<h2
								className={`${
									open && 'hidden'
								} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
							>
								{menu?.name}
							</h2>
						</Link>
					))}

					<div
						className="group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md cursor-pointer"
						onClick={() => {
							logout({ logoutParams: { returnTo: window.location.origin } });
							dispatch(clearUser());
							dispatch(clearChat({}));
							dispatch(clearMessages());
						}}
					>
						<div>{React.createElement(ImExit, { size: '20' })}</div>
						<h2
							style={{
								transitionDelay: `${menus.length + 6}00ms`,
							}}
							className={`whitespace-pre duration-500 ${
								!open && 'opacity-0 translate-x-28 overflow-hidden'
							}`}
						>
							Logout
						</h2>
						<h2
							className={`${
								open && 'hidden'
							} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
						>
							Logout
						</h2>
					</div>
				</>
			</div>
		</div>
	);
};

export default Navbar;

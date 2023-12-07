import Lottie from 'lottie-react';
import LottieAnimation from '../../features/dashboard/lottie.json';
import { useNavigate } from 'react-router-dom';

const Placeholder = () => {
	const navigate = useNavigate();

	const navigateToWallet = () => {
		navigate('/mywallet');
	};

	return (
		<div className="flex shadow-sm shadow-dark-purple bg-white rounded-lg sm:w-full md:w-[50%] h-full md:h-[50%] text-center m-auto flex-col md:flex-row">
			<Lottie animationData={LottieAnimation} loop className="flex flex-col" />
			<div className="flex items-center self-center text-center font-semibold text-[24px]">
				<span>
					You don't have linked any accounts. Go to <br></br>
					<span className="text-blue-800 underline cursor-pointer" onClick={() => navigateToWallet()}>
						My Wallet
					</span>{' '}
					to add an account.
				</span>
			</div>
		</div>
	);
};

export default Placeholder;

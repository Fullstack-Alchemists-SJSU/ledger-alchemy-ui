import React from 'react';
import '../../../global.css';
import './signup.css';
import Form from './form';
import { Image } from '@chakra-ui/react';
import Banner from './assets/banner.png';
import ResponsiveCenteredCard from '../../common/responsive/ResponsiveCenteredCard';

const Signup = () => {
	const [width, _] = React.useState(window.innerWidth);

	return (
		<ResponsiveCenteredCard>
			<div className="flex flex-row flex-1">
				<div className="flex flex-1 justify-center overflow-auto text-center">
					<Form />
				</div>
				{width >= 640 && (
					<div className="flex flex-1 invisible md:visible">
						<Image src={Banner} objectFit="cover" className="flex-1 rounded-tr-lg rounded-br-lg" />
					</div>
				)}
			</div>
		</ResponsiveCenteredCard>
	);
};

export default Signup;

import React from 'react';
import '../../global.css';
import './signup.css';
import Form from './form';
import { Image } from '@chakra-ui/react';
import Banner from './assets/banner.png';

const Signup = () => {
	const [width, _] = React.useState(window.innerWidth);

	return (
		<div className="container min-h-screen flex">
			<div className="card flex flex-1 w-full min-h-screen md:max-w-[80vw] md:min-h-[80vh] lg:max-h-[60vh] lg:min-w-[80vh] lg:min-h-[80vh] md:self-center mx-auto">
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
			</div>
		</div>
	);
};

export default Signup;

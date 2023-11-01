import { useState } from 'react';
import Form from './form';
import { Image } from '@chakra-ui/react';
import Banner from '../signup/assets/banner.png';

const Login = (): JSX.Element => {
	const [width, _] = useState(window.innerWidth);
	return (
		<div className="container min-h-screen flex">
			<div className="card flex flex-1 w-full min-h-screen md:max-w-[80vw] md:min-h-[80vh] lg:max-h-[60vh] lg:min-w-[80vh] lg:min-h-[80vh] md:self-center mx-auto">
				<div className="flex flex-row flex-1">
					<div className="flex flex-col flex-1 justify-center overflow-auto items-center">
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

export default Login;

import { Icon } from '@chakra-ui/react';
import { BiArrowBack } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
type ToolbarProps = {
	title: string;
};
const Toolbar = ({ title }: ToolbarProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<div className="min-w-full flex flex-row max-h-[64px] bg-dark-purple text-white p-4 items-center">
			{location.pathname !== '/' && (
				<Icon as={BiArrowBack} className="mr-4 cursor-pointer" onClick={() => handleBack()} />
			)}
			<div className="self-start font-bold">{title}</div>
		</div>
	);
};

export default Toolbar;

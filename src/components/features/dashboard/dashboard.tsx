import { useRef, useEffect, useState } from 'react';
import BaseContainer from '../../common/responsive/BaseContainer';
import Toolbar from '../../common/toolbar/Toolbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import Placeholder from '../../common/no_accounts_placeholder/Placeholder';

function Dashboard() {
	const ref = useRef(null);
	const user = useSelector((state: RootState) => state.rootReducer.user.user);
	const accounts = useSelector((state: RootState) => state.rootReducer.accountReducer.accounts);

	const [showPlaceholder, setShowPlaceholder] = useState(false);

	useEffect(() => {
		if (user) {
			if (accounts && accounts.length > 0) {
				setShowPlaceholder(false);
				initViz();
			} else {
				setShowPlaceholder(true);
			}
		}
	}, [user]);

	function initViz() {
		const { tableau } = window as any;

		var viz = new tableau.Viz(
			ref.current,
			`https://public.tableau.com/shared/CJC69YDP7?:display_count=n&:origin=viz_share_link&AccountOwnerEmailParam=${
				user?.email ?? 'All'
			}`,
			{ width: (ref.current as any).clientWidth, height: (ref.current as any).clientHeight }
		);
	}

	return (
		<BaseContainer>
			<div className="flex flex-col flex-1 max-h-screen">
				<Toolbar title="Dashboard" />
				{showPlaceholder ? <Placeholder /> : <div id="vizContainer" className="h-full" ref={ref}></div>}
			</div>
		</BaseContainer>
	);
}

export default Dashboard;

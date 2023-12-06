import { useRef, useEffect } from 'react';
import BaseContainer from '../../common/responsive/BaseContainer';
import Toolbar from '../../common/toolbar/Toolbar';

function Dashboard() {
	const ref = useRef(null);

	useEffect(() => {
		initViz();
	}, []);

	function initViz() {
		const { tableau } = window as any;

		var viz = new tableau.Viz(
			ref.current,
			'https://public.tableau.com/views/Ledger_Alcheemy_Dashboard/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link:account_owner=User_35',
			{ width: (ref.current as any).clientWidth, height: (ref.current as any).clientHeight }
		);
	}
	return (
		<BaseContainer>
			<div className="flex flex-col flex-1 max-h-screen">
				<Toolbar title="Dashboard" />
				<div id="vizContainer" className="h-full" ref={ref}></div>
			</div>
		</BaseContainer>
	);
}

export default Dashboard;

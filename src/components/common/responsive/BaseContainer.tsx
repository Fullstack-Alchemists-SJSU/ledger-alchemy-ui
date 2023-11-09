const BaseContainer = ({ children }: { children: React.ReactNode }) => (
	<div className="container min-h-screen flex m-0 min-w-[100%]">
		<div className="flex flex-1 w-full min-h-screen">{children}</div>
	</div>
);

export default BaseContainer;

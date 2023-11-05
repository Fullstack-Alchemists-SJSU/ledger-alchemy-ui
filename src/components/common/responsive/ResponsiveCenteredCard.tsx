const ResponsiveCenteredCard = ({ children }: { children: React.ReactNode }) => (
	<div className="container min-h-screen flex">
		<div className="card flex flex-1 w-full min-h-screen md:max-w-[80vw] md:min-h-[80vh] lg:max-h-[60vh] lg:min-w-[80vh] lg:min-h-[80vh] md:self-center mx-auto">
			{children}
		</div>
	</div>
);

export default ResponsiveCenteredCard;

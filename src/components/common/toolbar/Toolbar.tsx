type ToolbarProps = {
	title: string;
};
const Toolbar = ({ title }: ToolbarProps) => (
	<div className="min-w-full flex flex-row max-h-[64px] bg-white p-4 shadow-bottom">
		<div className="self-start font-bold">{title}</div>
	</div>
);

export default Toolbar;

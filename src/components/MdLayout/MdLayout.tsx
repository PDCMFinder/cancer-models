interface IMdLayoutProps {
	children: string;
	meta: {
		pageTitle: string;
	};
}

const MdLayout = (props: IMdLayoutProps) => {
	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">{props.meta.pageTitle}</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">{props.children}</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default MdLayout;

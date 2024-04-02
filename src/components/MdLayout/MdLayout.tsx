import { Head } from "next/dist/pages/_document";

interface IMdLayoutProps {
	children: string;
	meta: {
		pageTitle: string;
		metaTitle?: string;
		metaDescription?: string;
		metaKeywords?: string;
	};
}

const MdLayout = ({ children, meta }: IMdLayoutProps) => {
	return (
		<>
			{/* page metadata */}
			<Head>
				{meta.metaTitle ?? <title>{meta.metaTitle}</title>}
				{meta.metaDescription ?? (
					<meta name="description" content={meta.metaDescription} />
				)}
				{meta.metaKeywords ?? (
					<meta name="ketwords" content={meta.metaKeywords} />
				)}
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">{meta.pageTitle}</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">{children}</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default MdLayout;

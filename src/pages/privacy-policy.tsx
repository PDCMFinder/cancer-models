import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { getProcessedContent } from "../utils/getProcessedContent";

interface IPolicyProps {
	content: any;
}

const About: NextPage<IPolicyProps> = ({ content }: IPolicyProps) => {
	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Privacy Policy</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<div
								dangerouslySetInnerHTML={{
									__html: content,
								}}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
	const content = await getProcessedContent("privacy-policy");

	return {
		props: {
			content,
		},
	};
};

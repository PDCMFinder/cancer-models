import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Button from "../../components/Button/Button";
import { getProcessedContent } from "../../utils/getProcessedContent";

interface IAboutProps {
	content: any;
}

const About: NextPage<IAboutProps> = ({ content }: IAboutProps) => {
	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">About</h1>
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
					<div className="row">
						<div className="col-12 col-md-8 offset-md-2">
							<h2>Our data providers</h2>
						</div>
						<div className="col-12 col-md-8 offset-md-2">
							<Button
								color="dark"
								priority="primary"
								htmlTag="a"
								href="/about/providers"
								className="mt-0"
							>
								View all our data providers
							</Button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default About;

export const getStaticProps: GetStaticProps = async () => {
	const content = await getProcessedContent("about");

	return {
		props: {
			content,
		},
	};
};

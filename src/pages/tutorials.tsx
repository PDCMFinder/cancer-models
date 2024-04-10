import { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card/Card";

const videos = [
	{
		src: "https://www.youtube-nocookie.com/embed/v9D7Pgruvps?si=L_c437Ko6b5XsKAb",
		title: "Metadata template validator"
	},
	{
		src: "https://www.youtube-nocookie.com/embed/6jZ67iBG2HE?si=iMDvIDRm2qQyJIPy",
		title: "Metadata template dictionary"
	},
	{
		src: "https://www.youtube-nocookie.com/embed/nZupUUDrntg?si=YBk5bJ03h8dZmSsF",
		title: "CancerModels.Org portal batch download"
	},
	{
		src: "https://www.youtube-nocookie.com/embed/rEQ0fZtI5Ns?si=ZUIzqLXG53V6vC0S",
		title: "cBioPortal for CancerModels.Org"
	},
	{
		src: "https://www.youtube-nocookie.com/embed/CGnjoGCOuIY?si=Ultp1UofzPZqN3Pw",
		title:
			"Use case: How to find breast cancer models with mutated BRCA1 and BRCA2 in CancerModels.Org"
	},
	{
		src: "https://www.youtube-nocookie.com/embed/-kHQ-1QrPbk?si=85ymRIqm3POmBU6w",
		title:
			"Use case: How to find triple-negative breast cancer models from recurrent tumours"
	}
];

const Tutorials: NextPage = () => {
	return (
		<>
			{/* page metadata */}
			<Head>
				<title>Navigate the Portal with Expert Guidance</title>
				<meta
					name="description"
					content="Access expert tutorials on CancerModels.Org, effectively search for the next cancer model for your project."
				/>
			</Head>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Tutorials</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						{videos.map((video) => (
							<div className="col-6" key={video.src}>
								<Card
									className="mb-4"
									headerClassName="py-1"
									header={<h2 className="p m-0">{video.title}</h2>}
								>
									<iframe
										className="w-100 ar-16-9"
										src={video.src}
										title={video.title}
										frameBorder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerPolicy="strict-origin-when-cross-origin"
										allowFullScreen
									></iframe>
								</Card>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Tutorials;

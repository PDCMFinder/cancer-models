import type { NextPage } from "next";
import { useRouter } from "next/router";
import Card from "../components/Card/Card";

const Compare: NextPage = () => {
	const { query } = useRouter();
	const modelsToCompare =
			typeof query.models === "string" ? query.models.split(" ") : "",
		firstModel = modelsToCompare[0],
		secondModel = modelsToCompare[1];

	return (
		<>
			<header className="bg-primary-primary text-white mb-5 py-5">
				<div className="container">
					<div className="row py-5">
						<div className="col-12">
							<h1 className="m-0">Compare models</h1>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-6">
							<Card>
								<h2>{firstModel}</h2>
							</Card>
						</div>
						<div className="col-12 col-lg-6">
							<Card>
								<h2>{secondModel}</h2>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Compare;

import type { NextPage } from "next";
import Button from "../components/Button/Button";

const NotFound: NextPage = () => {
	return (
		<section>
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-8 offset-md-2">
						<h1 className="mb-5 text-center">
							404 - The page you're looking for can't be found
						</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-lg-8 offset-lg-2 text-center justify-content-center d-flex flex-column flex-md-row">
						<a className="link-text" href="/search">
							Search for models
						</a>
						<a className="link-text mx-4" href="/submit">
							Submit data
						</a>
						<a className="link-text" href="/contact">
							Get in touch
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFound;

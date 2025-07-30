import Link from "next/link";

const Banner = () => {
	return (
		<section className="bg-primary-quaternary py-3">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<p className="m-0">
							Important changes taking place at CancerModels.org,{" "}
							<b>effective September 1, 2025</b>. More info{" "}
							<Link href={"/2025-changes"}>here</Link>.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;

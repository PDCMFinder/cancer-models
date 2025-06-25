const Banner = () => {
	return (
		<section className="bg-primary-quaternary py-4">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<p className="text-family-primary">
							We need your help! Has CancerModels.Org saved you time or effort?
						</p>
						<p className="text-small">
							Please take 15 minutes to fill in a survey and help EMBL-EBI make
							the case for why open data resources are critical to life science
							research.
						</p>
						<p className="mb-0 text-small">
							Survey link:{" "}
							<a
								href="https://www.surveymonkey.com/r/QGFMBH8?channel=[webpage] "
								target="_blank"
								rel="noopener noreferrer"
							>
								https://www.surveymonkey.com/r/QGFMBH8
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Banner;

const EMBLBanner = () => {
	return (
		<section className="bg-primary-quaternary py-4">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center text-small">
						<p className="text-family-primary">
							Do data resources managed by EMBL-EBI and our collaborators make
							a-primary-quaternary difference to your work?
						</p>
						<p>
							Please take 10 minutes to fill in our annual user survey, and help
							us make the case for why sustaining open data resources is
							critical for life sciences research.
						</p>
						<p className="mb-0">
							Survey link:{" "}
							<a
								href="https://www.surveymonkey.com/r/HJKYKTT?channel=www.cancermodels.org"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://www.surveymonkey.com/r/HJKYKTT?channel=www.cancermodels.org
							</a>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EMBLBanner;
